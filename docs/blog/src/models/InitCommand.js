const ProjectCommands = new mongoose.Schema({
  	project_name: {
    	type: String,
  	},
    app_id: {
      type: String,
    },
    email: {
      type: String,
    },
    project_path: {
      type: String,
    },
    project_type: {
      type: String,
    },
    template_type: {
      type: String,
    },
  	ip_address: {
    	type: String
  	},
  	node_version: {
    	type: String
  	},
  	npm_version: {
    	type: String
  	},
  	cli_version: {
    	type: String
  	},
  	desktop_session: {
    	type: String
  	},
  	created_at: {
    	type: String
  	},
  	updated_at: {
    	type: String
  	}
})

const ProjectCommand = mongoose.model("init_commands", ProjectCommands);


module.exports = ProjectCommand;
