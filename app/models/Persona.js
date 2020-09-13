/* global Persona, VSError */

module.exports = {

  attributes: {
    name: {
      type: String,
      required: true
    },
    elected: {
      type: Boolean,
      required: true,
      default: false,
    },
    logged: {
      type: Boolean,
      required: true,
      default: false,
    }
  },

  indexes: [
    {
      name: 'text'
    }
  ],

  savePersona: (data) => {
    if (typeof (data._id) === 'undefined') {
      const obj = new Persona(data);
      return obj.save();
    }

    const { _id } = data;
    return Persona.getPersona(_id).then( (i) => {
      const s = i.toObject({ transform: true });
      const merge = { ...s, ...data };
      return Persona.findOneAndUpdate({ _id }, merge, { new: true });
    });
  },

  getPersona: (_id) => {
    return Promise.resolve().then( () => {
      if (!(/^[a-fA-F0-9]{24}$/).test(_id)) {
        return VSError.notFound();
      }
      return Persona.findOne({ _id }).then((r) => {
        if (!r) {
          return VSError.notFound();
        }
        return r;
      });
    });
  },

  getAllPersonas: () => {
    return Promise.resolve().then(() => {
      return Promise.resolve().then(() => {
        return Persona.find();
      });
    });
  },

};
