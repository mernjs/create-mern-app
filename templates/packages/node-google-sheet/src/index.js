const { google } = require('googleapis');

class GoogleSheets {
    constructor() {
        this.authClient = null;
        this.spreadsheetId = null;
        this.sheetName = null;
        this.sheets = null;
    }

    async authorize(keyFile, spreadsheetId) {
        this.spreadsheetId = spreadsheetId;
        const auth = new google.auth.GoogleAuth({
            keyFile: keyFile,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        this.authClient = await auth.getClient();
        this.sheets = google.sheets({ version: 'v4', auth: this.authClient });
    }

    async createSheet(sheetTitle) {
        if (!this.sheets) throw new Error('Authorization failed or not yet completed.');

        const request = {
            spreadsheetId: this.spreadsheetId,
            resource: {
                requests: [
                    {
                        addSheet: {
                            properties: {
                                title: sheetTitle,
                            },
                        },
                    },
                ],
            },
        };

        const response = await this.sheets.spreadsheets.batchUpdate(request);
        return {
            id: response.data?.replies?.[0]?.addSheet.properties.sheetId,
            name: response.data?.replies?.[0]?.addSheet.properties.title,
        };
    }

    async getAllSheets() {
        if (!this.sheets) throw new Error('Authorization failed or not yet completed.');

        const response = await this.sheets.spreadsheets.get({
            spreadsheetId: this.spreadsheetId,
        });

        return response.data.sheets.map(sheet => ({
            id: sheet.properties.sheetId,
            name: sheet.properties.title,
        }));
    }

    async getSheet(sheetId) {
        if (!this.sheets) throw new Error('Authorization failed or not yet completed.');

        const allSheets = await this.getAllSheets();
        const sheet = allSheets.find(s => s.id == sheetId);
        if (!sheet) throw new Error(`Sheet with ID ${sheetId} not found.`);

        const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: `${sheet.title}`,
        });

        return response.data.values || [];
    }

    async updateSheet(sheetId, newTitle) {
        if (!this.sheets) throw new Error('Authorization failed or not yet completed.');

        const request = {
            spreadsheetId: this.spreadsheetId,
            resource: {
                requests: [
                    {
                        updateSheetProperties: {
                            properties: {
                                sheetId: sheetId,
                                title: newTitle,
                            },
                            fields: 'title',
                        },
                    },
                ],
            },
        };

        const response = await this.sheets.spreadsheets.batchUpdate(request);
        return {
            id: response.data?.replies?.[0]?.addSheet.properties.sheetId,
            name: response.data?.replies?.[0]?.addSheet.properties.title,
        };
    }

    async deleteSheet(sheetId) {
        if (!this.sheets) throw new Error('Authorization failed or not yet completed.');

        const request = {
            spreadsheetId: this.spreadsheetId,
            resource: {
                requests: [
                    {
                        deleteSheet: {
                            sheetId: sheetId,
                        },
                    },
                ],
            },
        };

        const response = await this.sheets.spreadsheets.batchUpdate(request);
        return {
            id: response.data?.replies?.[0]?.addSheet.properties.sheetId,
            name: response.data?.replies?.[0]?.addSheet.properties.title,
        };
    }

    async connectSheet(sheetName) {
        this.sheetName = sheetName;
    }

    async addHeader(headers) {
        if (!this.sheets) throw new Error('Authorization failed or not yet completed.');
        if (!Array.isArray(headers)) throw new Error('Headers must be provided as an array.');

        const response = await this.sheets.spreadsheets.get({ spreadsheetId: this.spreadsheetId });
        const sheet = response.data.sheets.find(s => s.properties.title === this.sheetName);
        const rowCount = sheet.properties.gridProperties.rowCount;

        if (rowCount >= 1000) {
            await this.deleteExcessRows(rowCount);
        }

        const existingHeaders = await this.getHeaders();
        const newHeaders = [...new Set([...existingHeaders, ...headers])]; // Combine and deduplicate headers

        return this.sheets.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: `${this.sheetName}!A1`,
            valueInputOption: 'RAW',
            resource: { values: [newHeaders] },
        });
    }

    async deleteExcessRows(startRow) {
        if (!this.sheets) throw new Error('Authorization failed or not yet completed.');
        const allSheets = await this.getAllSheets();
        const sheet = allSheets.find(s => s.name == this.sheetName);
        if (!sheet) throw new Error(`Sheet with ID ${sheetId} not found.`);
        const request = {
            spreadsheetId: this.spreadsheetId,
            resource: {
                requests: [{
                    deleteDimension: {
                        range: {
                            sheetId: sheet.id,
                            dimension: 'ROWS',
                            startIndex: startRow - 1, // Start from this row index (0-based)
                            endIndex: 1000, // Up to 1000
                        },
                    },
                }],
            },
        };
        return this.sheets.spreadsheets.batchUpdate(request);
    }

    async getHeaders() {
        const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: this.sheetName,
        });
        const rows = response.data.values || [];
        return rows[0] || [];
    }

    async insert(data) {
        if (!this.sheets) throw new Error('Authorization failed or not yet completed.');
        if (!data || typeof data !== 'object') throw new Error('Data is required and must be an object.');

        const headers = await this.getHeaders();
        const values = new Array(headers.length).fill(null);

        for (const key in data) {
            const index = headers.indexOf(key);
            if (index === -1) {
                throw new Error(`Column "${key}" not found in sheet.`);
            }
            values[index] = data[key];
        }

        return this.sheets.spreadsheets.values.append({
            spreadsheetId: this.spreadsheetId,
            range: `${this.sheetName}!A1`,
            valueInputOption: 'RAW',
            resource: { values: [values] },
        });
    }

    async find(filterObj = {}, paginationObj = {}) {
        if (!this.sheets) throw new Error('Authorization failed or not yet completed.');
        const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: this.sheetName,
        });

        const rows = response.data.values || [];
        if (rows.length === 0) return {
            data: [],
            totalRecords: 0,
            totalPages: 0,
            currentPage: 0,
        };

        const header = rows[0];
        const data = rows.slice(1).map(row => {
            const obj = {};
            header.forEach((key, index) => {
                obj[key] = row[index] || null;
            });
            return obj;
        });

        // Filter Logic
        let filteredData = data;

        if (filterObj && Object.keys(filterObj).length > 0) {
            filteredData = filteredData.filter(row =>
                Object.keys(filterObj).every(key => row[key] === filterObj[key])
            );
        }

        // Pagination Logic
        let paginatedData = filteredData;
        let totalRecords = filteredData.length;

        if (paginationObj) {
            const { page, pageSize } = paginationObj;
            const pageNumber = page || 1;
            const size = pageSize || totalRecords; // If no size provided, get all records

            const totalPages = Math.ceil(totalRecords / size);
            const offset = (pageNumber - 1) * size;
            paginatedData = filteredData.slice(offset, offset + size);

            return {
                data: paginatedData,
                totalRecords,
                totalPages,
                currentPage: pageNumber,
            };
        }

        return {
            data: filteredData,
            totalRecords,
            totalPages: 1,
            currentPage: 1,
        };
    }

    async findOne(criteria) {
        if (!this.sheets) throw new Error('Authorization failed or not yet completed.');
        const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: this.sheetName,
        });

        const rows = response.data.values || [];
        if (rows.length === 0) return null;

        const header = rows[0]; // Get the header row
        const foundRow = rows.slice(1).find(row =>
            Object.keys(criteria).every(key => row[header.indexOf(key)] === criteria[key])
        );

        if (!foundRow) return null;

        const result = {};
        header.forEach((key, index) => {
            result[key] = foundRow[index] || null;
        });

        return result;
    }

    async updateOne(criteria, updates) {
        if (!this.sheets) throw new Error('Authorization failed or not yet completed.');
        const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: this.sheetName,
        });

        const rows = response.data.values || [];
        if (rows.length === 0) throw new Error('No data available.');

        const header = rows[0];
        const rowIndex = rows.slice(1).findIndex(row =>
            Object.keys(criteria).every(key => row[header.indexOf(key)] === criteria[key])
        );

        if (rowIndex === -1) throw new Error('Data not found for the given criteria.');

        const targetRow = rows[rowIndex + 1]; // Offset by one for the header row

        for (const key in updates) {
            const colIndex = header.indexOf(key);
            if (colIndex !== -1) {
                targetRow[colIndex] = updates[key];
            } else {
                throw new Error(`Column "${key}" not found.`);
            }
        }

        return this.sheets.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range: `${this.sheetName}!A${rowIndex + 2}`,
            valueInputOption: 'RAW',
            resource: { values: [targetRow] },
        });
    }

    async deleteOne(criteria) {
        if (!this.sheets) throw new Error('Authorization failed or not yet completed.');
        const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range: this.sheetName,
        });

        const rows = response.data.values || [];
        if (rows.length === 0) throw new Error('No data available.');

        const header = rows[0];
        const rowIndex = rows.slice(1).findIndex(row =>
            Object.keys(criteria).every(key => row[header.indexOf(key)] === criteria[key])
        );

        if (rowIndex === -1) throw new Error('Data not found for the given criteria.');

        return this.sheets.spreadsheets.values.clear({
            spreadsheetId: this.spreadsheetId,
            range: `${this.sheetName}!A${rowIndex + 2}:Z${rowIndex + 2}`,
        });
    }


}

module.exports.GoogleSheets = GoogleSheets