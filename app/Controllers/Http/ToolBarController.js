// app/Controllers/Http/SomeController.js
const View = use('View');

class ToolBarController {
  async show({ view }) {
    const data = {
      title: 'Título del componente',
      content: 'Contenido del componente',
    };

    //const bladeContent = view.render('vista.edge').getContent();
    //return view.render('vue-component', { bladeContent });
    
    const toolbarContent = await View.render('toolbar', data);
    return view.render('PreguntasExpresiones', { toolbarContent });
  }
}

module.exports = ToolBarController;
