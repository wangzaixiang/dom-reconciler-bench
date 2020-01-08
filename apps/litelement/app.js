// import {} from 
import {LitElement, html} from 'lit-element'

class TodoElement extends LitElement {

    static get properties() {
        return {
            title: { type: String },
            completed: { type: Boolean },
            editing: { type: Boolean }
        }
    }

    createRenderRoot(){
        return this;
    }

    render(){
        return html`
        <li>
          <div class="view">
            <label @dblclick="${this.edit}">${this.title}</label>
            <input class="toggle" type="checkbox" ?checked="${this.completed}"></input>
            <button class="destroy" @tap="${this.drop}"></button>
          </div>
          <input id="input" class="input edit" @keydown="${this.keydown}">
          </input>
        </li>
        `
    }

    edit(){
        var inpit = this.shadowRoot.getElementById("input");
        input.getElementById("input").value = this.title;
        setTimeout( ()=>{input.focus(); } );
    }

    drop(){
        API.removeTodo(this.title);
    }

    toggle(){
        API.toggleTodo(data)
    }

    submit(){
        var title = this.input.value.trim()
        if(title != "") API.renameTodo(this.data, title);
        else this.drop();
    }

    cancel(){
        this.input.blur();
    }

}

customElements.define("my-todo", TodoElement);

class TodoApp extends LitElement {

    static get properties() {
        return {
            counter: { type: Number },
            todos: { type: Object },
            filters: { type: String }
        }
    }

    constructor(){
        super();
        this.counter = 0;
        this.todos = API.todos();
        // this.requestUpdate();
    }

    connectedCallback(){
        super.connectedCallback();
        window.addEventListener('hashchange', (ev) => {
            switch(window.location.hash){
                case "#/active": this.filters = "active"; break;
                case "#/completed": this.filters = "completed"; break;
                default: this.filters = "all"; break;
            }
        });
    }

    createRenderRoot(){
        return this;
    }

    update(){
        super.update();
        var elems = this.querySelectorAll("my-todo")
        // if(elems.length > 0)
            // elems[0].update();
        for(var i = 0; i < elems.length; i++){
           elems[i].update();
        }
    }

    render(){
        //var all = API.todos();
        //console.log(`doing render with ${this.filters}`)
        var all = this.todos;
        var done = all.filter( (item) => item.completed)
        var actives = all.filter( (item) => item.completed == false)

        var items = (this.filters == "active") ? actives : (this.filters == "completed") ? done : all;

        var item_elements = items.map( it => html`<my-todo .title="${it.title}" .completed="${it.completed}"></my-todo>`) 

        return html`
        <div class="app">
            <header class="header">
                <h1>${this.counter}</h1>
                <input class="new-todo" type="text" placeholder="What to do?" autofocus="true"></input>
            </header>
            <section class="main">
                <ul class="todo-list">
                    ${item_elements}
                </ul>
            </section>
            <footer class="footer">
                <span class="todo-count">
                    <strong>${actives.length}</strong><span>${actives.length != 1 ? 's' : ''} left</span>
                </span>
                <ul class="filters">
                    <li> <a href="#/"> All </a></li>
                    <li> <a href="#/active"> Active </a></li>
                    <li> <a href="#/completed"> Completed </a></li>
                </ul>
                <button class="clear-completed">Clear Completed</button>
            </footer>
        </div>
        `
    }

}

customElements.define("my-app", TodoApp);