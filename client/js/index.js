/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import 'babel-polyfill';
import __ from './__';

window._app = {
  init() {
    this.personas = [];
    const elected = this.alreadyElected();

    if (elected) {
      this.finish(true);
    } else {
      this.welcome();
    }
  },

  async welcome() {
    const personas = await __.get('api/personas');
    const { data } = personas;
    const ps = __.shuffle(data);
    this.personas = data;

    let content = '';
    ps.forEach((p) => {
      const {
        name,
        _id,
        logged
      } = p;

      content += /* html */`
        <li>
          <span class="name">
            <a href="" onclick="_app.select_persona('${_id}', event)">${name}</a>
          </span>
          <span class="status"><i class="mdi mdi-check-circle ${logged === true ? 'active' : ''}"></i></span>
        </li>
      `;
    });

    __.html('#welcome ul', content);
    __.qsa('section').forEach((s) => {
      s.classList.remove('active');
    });
    __.qs('#welcome').classList.add('active');
  },

  select_persona(_id, event) {
    event.preventDefault();

    const persona = window._app.personas.find((p) => p._id === _id);
    const { logged, _id: current_persona } = persona;
    this.current_persona = current_persona;

    if (logged) return false;

    let output = '';
    __.shuffle(this.personas).forEach((p) => {
      const { _id: id, elected } = p;
      if (!elected && id !== _id ) {
        output += /* html */`
          <li>
            <a href="" onClick="_app.selectPapelito('${id}', event)">AMIGO SECRETO</a>
          </li>
      `;
      }
    });

    __.qsa('section').forEach((s) => {
      s.classList.remove('active');
    });
    __.html('#select_persona ul', output);
    __.qs('#select_persona').classList.add('active');

    return true;
  },

  async selectPapelito(_id, event) {
    event.preventDefault();

    if (!confirm('¿Estás seguro de elegir este papelito?')) return false;

    const persona = this.personas.find((p) => p._id === _id);
    const { name } = persona;
    localStorage.elected_persona = name;
    localStorage.current_persona = this.current_persona;

    await __.post('api/personas', { _id: this.current_persona, logged: true });
    await __.post('api/personas', { _id, elected: true });

    this.finish();
    return true;
  },

  finish(hidden = false) {
    const persona = localStorage.elected_persona;
    __.html('#finish li:first-child a', persona);

    if (hidden) {
      __.qs('#finish li:first-child').classList.remove('active');
      __.qs('#finish li.placeholder').classList.add('active');
      __.qs('a.action.ocultar').classList.remove('active');
      __.qs('a.action.mostrar').classList.add('active');
    }

    __.qsa('section').forEach((s) => {
      s.classList.remove('active');
    });
    __.qs('#finish').classList.add('active');
  },

  ocultar(event) {
    event.preventDefault();

    __.qs('#finish li:first-child').classList.remove('active');
    __.qs('#finish li.placeholder').classList.add('active');
    __.qs('a.action.ocultar').classList.remove('active');
    __.qs('a.action.mostrar').classList.add('active');
  },

  mostrar(event) {
    event.preventDefault();

    __.qs('#finish li:first-child').classList.add('active');
    __.qs('#finish li.placeholder').classList.remove('active');
    __.qs('a.action.ocultar').classList.add('active');
    __.qs('a.action.mostrar').classList.remove('active');
  },

  alreadyElected() {
    let output = false;
    if (localStorage.current_persona) {
      output = localStorage.current_persona;
    }
    return output;
  }
};

window._app.init();
