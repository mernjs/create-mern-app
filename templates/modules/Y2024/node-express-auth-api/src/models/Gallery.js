const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const GallerySchema = new Schema(
	{
		image: {
			type: String,
			required: true,
		}
	},
	{ timestamps: { currentTime: () => Date.now() } },
);

GallerySchema.plugin(mongoosePaginate)

const Gallery = mongoose.model('gallery', GallerySchema);

module.exports = Gallery;
