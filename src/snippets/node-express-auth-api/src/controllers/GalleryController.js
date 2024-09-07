const Utilities = require('../Utilities');
const Gallery = require('../models/Gallery');
const profileImageBasePath = `${process.env.DOMAIN}/static/gallery`

class GalleryController {

	async addImage(req, res) {
		try {
			const image = await Utilities.uploadImage(req.body.image, 'gallery')
			const response = new Gallery({ image })
			const savedImage = await response.save()
			let data = {
				id: savedImage._id,
				image: `${profileImageBasePath}/${savedImage.image}`
			}
			Utilities.apiResponse(res, 200, 'Image Uploaded Successfully!', data)
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}

	async getImages(req, res) {
		try {
			const options = {
				page: req.query?.page || 1,
				limit: req.query?.limit || 10,
				sort: { createdAt: -1 }
			};
			const response = await Gallery.paginate({}, options)
			let allImages = []
			response.docs.map(img => allImages.push({
				id: img._id,
				image: `${profileImageBasePath}/${img.image}`
			}))
			const data = {
				images: allImages,
				pagination: {
					"totalDocs": response.totalDocs,
					"limit": response.limit,
					"totalPages": response.totalPages,
					"page": response.page,
				}
			}
			Utilities.apiResponse(res, 200, 'Get Images Successfully', data)
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}

	async deleteImage(req, res) {
		try {
			const gallery = await Gallery.find({ _id: req.params.imageId }).remove().exec();
			if (gallery.deletedCount === 0) return Utilities.apiResponse(res, 422, 'Image Not Found')
			Utilities.apiResponse(res, 200, 'Image Deleted Successfully')
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}

}

module.exports = new GalleryController(); 