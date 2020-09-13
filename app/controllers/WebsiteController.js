/* global Persona */

/**
 * WelcomeController.js
 */

module.exports = {

  get: (req, res) => {
    res.render('index.njk', { test: 'none' });
  },

  listPersonas: (req, res) => {
    res.vsr(Persona.getAllPersonas());
  },

  savePersona: (req, res) => {
    res.vsr(Persona.savePersona(req.body));
  },
};
