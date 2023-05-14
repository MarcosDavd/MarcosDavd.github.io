    var previous;
        var next;
        var url = "https://swapi.dev/api/people/";
        var contador = 1;
        
        //funcion para crear el personaje
        function crearPersonaje (data){
            var personaje = {
                    Nombre : "",
                    Nacimiento : "",
                    Altura: "",
                    Peso: "",
                }    
            for (i = 0; i < data.results.length; i++){
                personaje.Nombre = data.results[i].name;
                personaje.Nacimiento = data.results[i].birth_year;
                personaje.Altura = data.results[i].height;
                personaje.Peso = data.results[i].mass;
                if (contador != 17){
                    var img = document.createElement("img");
                    let num= urlDeImagen(data);
                    let url = "https://starwars-visualguide.com/assets/img/characters/"+(num)+".jpg"
                    img.src = url; 
                } 
                let divv=document.createElement("div");
                let ul = document.createElement("ul");
                for (elem in personaje){
                    let li = document.createElement("li");
                    li.innerHTML = elem +' : '+personaje[elem];
                    ul.appendChild(li);
                }
                ul.appendChild(img);
                divv.appendChild(ul);
                contador++; 
                let container = document.getElementById("container");
                container.appendChild(divv);
            }
        }
        //agrego por cada fetch la cantidad de personajes recibidos al conatiner
        //fin de crear personaje

        // se ejecuta esta parte al momento de cargar la pagina
        //oculto el boton "anterior" cuando se carga la pagina ya que no hay paginas anteiores
        let boton = document.getElementById('botonPre');
        boton.style.display = "none";
        fetch(url)
        .then(response => response.json())
        .then(data => {
            crearPersonaje(data);
            cambiarUrl(data.next, data.previous, next, previous);
        })  
        .catch (err => console.log(err));
        // se termino de carga la pagina

        //funcion para volver una pagina anterior y mostrar esos personajes
        function PagPost(next, previous){
            fetch(next)
            .then(response => response.json())
            .then(data => {
                crearPersonaje(data);
                console.log(data.previous);
                console.log(data.next);
                cambiarUrl(data.next, data.previous);
            })  
            .catch (err => console.log(err));
        }

        //funcion para cambiar la url que usa el fetch 
        function cambiarUrl(URLnext, URLprevious){
            previous = URLprevious;
            next = URLnext;
            if (previous == null){
                let boton = document.getElementById('botonPre');
                boton.style.display = "none";
            }else{
                let boton = document.getElementById('botonPre');
                boton.style.display = "block";
            }
            if (next == null){
                let boton = document.getElementById('botonNext');
                boton.style.display = "none";
            }else{
                let boton = document.getElementById('botonNext');
                boton.style.display = "block";
            }

        }

        // funcion que crea imagen
        function urlDeImagen(data) {
            let num;
            if (data.next!=null) {
                    var numerodepagina= data.next.length-1;//tomo la loongitud del url
                    numerodepagina=data.next[numerodepagina];//tomo numero de pagina siguiente
                }else{ 
                    var numerodepagina= data.previous.length-1;//tomo la loongitud del url
                    numerodepagina=data.previous[numerodepagina];}//tomo numero de pagina anterior
                    numerodepagina=numerodepagina-1;
                if(numerodepagina==1){
                        num=i+1;
                    }else{
                        if(i<=6 && numerodepagina== 2){
                            num=(i+1)+(numerodepagina-1)*10;
                    }else  
                        num=((i+2)+(numerodepagina-1)*10);}
           return num;

        }

        // funcion que permite ir a la sig pagina y mostrar dados personajes
        function PagPre(previous, next){
            fetch(previous)
            .then(response => response.json())
            .then(data =>{
                crearPersonaje(data);
                cambiarUrl(data.next, data.previous);
            })
            .catch (err => console.log(err));
        }
        // funcion para eliminar los datos actules de la pagina , sirve tanto para mostrar
        // la pagina anterior y la sig posibilitando poner los pedidos
        function eliminar(){
            let container = document.getElementById('container');
            let todosDivs= container.querySelectorAll('div');
            for (let i = 0; i< todosDivs.length; i++) {
               console.log("personaje eliminado:"); 
               console.log(todosDivs[i]);
               container.removeChild(todosDivs[i]);
            }
        }
        // acciona a realizar en caso de evento click en boton sig o anterior
        buttons.addEventListener('click', (e)=> {//funcion del botton
            if (e.target.classList.contains('btnNext')){//si es siguiente
                eliminar()
                PagPost(next, previous);
            }else{
                if (e.target.classList.contains('btnPre')){//si es anterior
                    eliminar()
                    PagPre(previous, next);
                }
            }
        })