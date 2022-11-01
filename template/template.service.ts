import Template from "./template.model";

export const TemplateService = {

    create(payload) {
        return Template.create(payload)
    },

    getAll() {
        return Template.find()
    },

    getById(id) {
        return Template.findById(id)
    },

    deleteById(id) {
        return Template.findByIdAndDelete(id);
    },

    updateById(_id, payload) {
        delete payload._id;
        return Template.findOneAndUpdate({_id}, payload, {new: true})
    }
}
