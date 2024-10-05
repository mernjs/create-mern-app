import SwiftUI

class FileManagerViewModel1: ObservableObject {
    @Published var files: [String] = []
    
    let fileManager = FileManager.default
    let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    
    func createFile(named fileName: String, withContent content: String) {
        let fileURL = documentsDirectory.appendingPathComponent(fileName)
        
        do {
            try content.write(to: fileURL, atomically: true, encoding: .utf8)
            files.append(fileName)
        } catch {
            print("Error creating file: \(error)")
        }
    }
    
    func readFile(named fileName: String) -> String? {
        let fileURL = documentsDirectory.appendingPathComponent(fileName)
        
        do {
            let content = try String(contentsOf: fileURL, encoding: .utf8)
            return content
        } catch {
            print("Error reading file: \(error)")
            return nil
        }
    }
    
    func updateFile(named fileName: String, withContent content: String) {
        let fileURL = documentsDirectory.appendingPathComponent(fileName)
        
        do {
            try content.write(to: fileURL, atomically: true, encoding: .utf8)
        } catch {
            print("Error updating file: \(error)")
        }
    }
    
    func deleteFile(named fileName: String) {
        let fileURL = documentsDirectory.appendingPathComponent(fileName)
        
        do {
            try fileManager.removeItem(at: fileURL)
            if let index = files.firstIndex(of: fileName) {
                files.remove(at: index)
            }
        } catch {
            print("Error deleting file: \(error)")
        }
    }
}

struct FileManagerView1: View {
    @StateObject var fileManager = FileManagerViewModel1()
    @State private var newFileName = ""
    @State private var fileContent = ""
    
    var body: some View {
        VStack {
            TextField("Enter file name", text: $newFileName)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            
            TextField("Enter file content", text: $fileContent)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            
            HStack {
                Button("Create") {
                    fileManager.createFile(named: newFileName, withContent: fileContent)
                    newFileName = ""
                    fileContent = ""
                }
                
                Button("Read") {
                    if let content = fileManager.readFile(named: newFileName) {
                        fileContent = content
                    }
                }
                
                Button("Update") {
                    fileManager.updateFile(named: newFileName, withContent: fileContent)
                }
                
                Button("Delete") {
                    fileManager.deleteFile(named: newFileName)
                    newFileName = ""
                    fileContent = ""
                }
            }
            .padding()
            
            List(fileManager.files, id: \.self) { fileName in
                Text(fileName)
            }
        }
        .padding()
    }
}
