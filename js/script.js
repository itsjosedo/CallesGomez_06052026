var limpiar = document.getElementById("limpiar");
var canvas = document.getElementById("canvas")

if(canvas.getContext)
{
    var ctx = canvas.getContext("2d");
    var cw = canvas.width = 500, cx = cw/2; //tamaño(ancho) y posicion en x
    var ch = canvas.height = 500, cy = ch/2 //tamaño(alto) y posicion en y

    var dibujar = false;
    var factordeAlisamineto = 5;
    var Trazados = [];
    var puntos = [];

    ctx.lineJoin = "round";

    limpiar.addEventListener('click', function(){
        dibujar = false;
        ctx.clearRect(0,0,cw,ch); //Magia de limpiar
        Trazados.length = 0;
        puntos.length = 0;
    }, false);

    canvas.addEventListener('mousedown', function(){
        dibujar = true;
        puntos.length = 0;
        ctx.beginPath();
    }, false);

    canvas.addEventListener('mouseup', redibujarTrazados, false);

    canvas.addEventListener('mouseout', redibujarTrazados, false);

    canvas.addEventListener('mousemove', function(evt){
        if(dibujar){
            var m = onMousePost(canvas, evt);
            puntos.push(m);
            ctx.lineTo(m.x,m.y)
            ctx.strokeStyle = "red"
            ctx.stroke();
        }
    }, false);

    function reducirArray(n,elArray){
        let nuevoArreglo = elArray.filter((_,i) => i % n === 0); //Fltra los puntos para cada "n position"
        nuevoArray.push(elArray[elArray.length - 1]); //El ultimo punto del trazado debe agregarse
        Trazados.push(nuevoArray)
    }
    
    function calcularPuntoDeControl(ry,a,b){
        return{
            x:(ry[a].x + ry[b].x) /2,
            y:(ry[a].y + ry[b].y) /2
        };
    }

    function alisartrazado(ry){
        if(ry.length > 1){ //tiene que haber mas de 1 punto para trazar la nueva linea 
            var ultimoPunto = ry.length -1;
            ctx.beginPath();
            ctx.moveTo(ry[0].x, ry[0].y); //Inicia el trazado en el primer punto

            for(let i = 1; i < ry.length - 2; i++){
                let pc = calcularPuntoDeControl(ry,i,i+1);
                ctx.qudraticCurveTo(ry[i].x, ry[i].y, pc.x, pc.y); //Dibuja la curva actual desde el punto actual al punto de control
            }
            ctx.qudraticCurveTo(ry[ultimoPunto -1].x, ry[ultimoPunto -1].y, ry[ultimoPunto].x, ry[ultimoPunto].y);
            ctx.stroke();
        }
    }

    function redibujarTrazados(){
        dibujar = false;
        ctx.ClearRect(0,0, cw, ch);
        reducirArray(factordeAlisamineto, puntos); //Reduce la cantidad de puntos
        Trazados.forEach(trazado => alisartrazado(trazado)); //Suaviza y redibuja los trazos
    }

    function onMousePost(canvas, evt){
        let rect = canvas.getBoundingClientRect();
        return{
            x: Math.round(evt.clientX - rect.left),
            y: Math.round(evt.clientY - rect.top)
        };
    }

}else{
    alert("No se soporta el contexto")
}