let abonent={
	key:'',
	session:'',	
	domain:'',
	port:''
};

class MyClass { //задача очереди: создать и добавить генераторы,по очереди перебирать их
	constructor(writer) {
		this.writer = writer; //функция через которую отправляем сообщения
	}
	queue=new Set(); //очередь
	done=true; //текущее состояние очереди
	callback={}; //функция вобратного вызова устанавливается при добавлении в очередь
	iterator={}; //итератор
	buffer={}; //текущая команда
	timer; //указатель на текущий таймер ответа
	listener(data) {//получатель ответных сообщений
		clearTimeout(aa.timer);
		if(this.buffer){
			if(this.buffer.callback){
				this.buffer.callback(data);
			}
			this.buffer.gen.next(data);
		}
	}
	add(func,  data, comment, callback) {//функция добавления в очередь
		let gen;
		if(data){
			gen=func.call(this, data, comment);
		}else{
			gen=func.call(this,'',comment);
		}
		let step={gen, callback};
		if(this.done){
			this.queue.clear();
			this.queue.add(step);
			this.iterator = this.queue[Symbol.iterator](); //итератор для очереди
			let result=this.iterator.next();
			this.done=result.done;
			this.buffer=result.value;
			this.buffer.gen.next();
		}else{
			this.queue.add(step);
		}

	}
	next(comment) { //следующий шаг в очереди
		if(comment){
			control.writer(comment); //пишем в окно
		}
		let result=this.iterator.next();
		this.done=result.done;
		this.buffer=result.value;
		if(!this.done){
			this.buffer.gen.next();
		}
	}
}


let aa; //= new MyClass(abonent.writer); //параметр - функция отправки сообщения

function *gen(data, comment){ //типовая одноразовая команда с выводом результата в окно
	this.writer.write(data); //отправляем подготовленное сообщение
	this.timer=setTimeout(()=>this.next( comment), 200);
	let answer = yield; //получаем ответ от устройства
	control.writer(comment+": "+ new TextDecoder("utf-8").decode(data)); //пишем в окно
	this.next();
}

function pt(data){  //передача сообщения внешнему API
	console.log("print - "+data);
}


let links={ //связываем действия пользователя с функциями
	click:{}, //кнопки
	formats:{},
	felds:{},  //поля для ручного ввода данных
	selects:{}, //элементы selektые,

    call_func (e){
		let link=e.target;
        name=link.dataset.click;
        if(name!='undefined'){ //функции по клику
			control[name](link); 
        }
    },
    call_func_chng (e){
        let link=e.target;
        name=link.dataset.id;
        if(link.dataset.id){ //функции по изменению
			control[name](link);
        }
    },
};

let control={
	//var encoded = new TextEncoder().encode("Γεια σου κόσμε");
	//var decoded = new TextDecoder("utf-8").decode(encoded);
	buff_sum(arr){
		let lng_all=0;
		for(let i=0; i<arr.length; i++){
			lng_all=lng_all+arr[i].length;
		}
		let bfull = new Uint8Array(lng_all);
		let offset=0;
		for(let i=0; i<arr.length; i++){
			bfull.set(arr[i],offset);
			offset=offset+arr[i].length;
		}
		return bfull;
	},
	send1(){
	    let ab = new FormData();//создали объект форма
		for(let i in links.felds){
            ab.append(i, links.felds[i].value);
		}
        let file=document.querySelector('.centre>select');
        ab.append('file', myfile.files[0]);
        url='php/ax.php';
		comm.ax(ab, url);
	},
	typical(link){
		let data = new Uint8Array([0x69, 0x0D]); //i
		add_step(new Step(data, abonent.writer, "write",'','' ));
	},
	power(link){
		let data = new Uint8Array([0x41, 0x0D]); //A
		if(link.dataset.in==1){
			link.dataset.in=0;
			data = new Uint8Array([0x5A, 0x0D]); //Z
		}else{
			link.dataset.in=1;
		}
		aa.add(gen, data, "Power", pt);
	},
	beep(link){
		let data = new Uint8Array([0x53, 0x0D]); //S
		if(link.dataset.in==1){
			link.dataset.in=0;
			data = new Uint8Array([0x58, 0x0D]); //X
		}else{
			link.dataset.in=1;
		}
		add_step(new Step(data, abonent.writer, "write",'',"Beep" ));
	},
	ledr(link){
		let data = new Uint8Array([0x44, 0x0D]); //A
		if(link.dataset.in==1){
			link.dataset.in=0;
			data = new Uint8Array([0x43, 0x0D]); //Z
		}else{
			link.dataset.in=1;
		}
		add_step(new Step(data, abonent.writer, "write",'',"Led-R" ));
	},
	ledg(link){
		let data = new Uint8Array([0x46, 0x0D]); //S
		if(link.dataset.in==1){
			link.dataset.in=0;
			data = new Uint8Array([0x56, 0x0D]); //X
		}else{
			link.dataset.in=1;
		}
		add_step(new Step(data, abonent.writer, "write",'',"Led-G" ));
	},

	wiegand(link){
		let cmd = new TextEncoder().encode("OW1");
		let encoded = new TextEncoder().encode(num_key.value);
		let asd=2*Math.floor(encoded.length/2);
		let sub=encoded.subarray(0, asd);
		if(sub.length<6){
			let sub1 = new Uint8Array([48, 48, 48, 48, 48, 48]);
			sub1.set(sub,0);
			sub=sub1;
		}
		if(sub.length>16){
			let sub1=sub.subarray(0, 16);
			sub=sub1;
		}
		let enter = new Uint8Array([0x0D]);
		let data = control.buff_sum([cmd, sub, enter]);
		add_step(new Step(data, abonent.writer, "write",'',"Wiegand "+num_key.value ));
	},
	dallas(link){},
	d_start(link){
		let cmd = new TextEncoder().encode("OD1");
		let encoded = new TextEncoder().encode(num_key.value);
		let sub = new Uint8Array([48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48]);
		sub.set(encoded,0);
		let enter = new Uint8Array([0x0D]);
		let data = control.buff_sum([cmd, sub, enter]);
		abonent.start=1;
		abonent.go=1;
		add_step(new Step(data, abonent.writer, "write",'',"Dallas "+num_key.value+ " start" ));
	},
	d_stop(){
		if(abonent.start==1){
			let cmd = new TextEncoder().encode("OD0");
			let enter = new Uint8Array([0x0D]);
			let data = control.buff_sum([cmd, enter]);
			abonent.start=0;
		add_step(new Step(data, abonent.writer, "write",'',"Dallas stop" ));
		}
	},
	d_end(){
		if(abonent.go==1){
			let cmd = new TextEncoder().encode("OO");
			let enter = new Uint8Array([0x0D]);
			let data = control.buff_sum([cmd, enter]);
			abonent.go=0;
		add_step(new Step(data, abonent.writer, "write",'',"Write end" ));
		}
	},
	clear(link){
		pole.innerText="";
	},
	service(link){
		if(link.dataset.in==1){
			link.dataset.in=0;
			for(let i in links.formats){
				links.formats[i].style.display="none";
			}
			links.click["in"].style.visibility="hidden";
			links.click["out"].style.visibility="hidden";
		}else{
			link.dataset.in=1;
			for(let i in links.formats){
				links.formats[i].style.display="flex";
			}
			links.click["in"].style.visibility="visible";
			links.click["out"].style.visibility="visible";
		}

	},
	recovery(link){ //подключение (выбор) ком порта (канал ввода вывода)
		let filters = [
			{ usbVendorId: 8580, usbProductId: 17 }
		];
		let settings = {
			baudRate: 19200,
			dataBits: 8,
			stopBits: 1,
			parity: "none",
			flowControl: "none"
		};
		(async () => { //ввод и вывод данных порта
			port = await navigator.serial.requestPort({filters}); //выбираем порт
			await port.open(settings); //настройки
			for(let i in links.click){
				links.click[i].style.opacity=1;
			}
			writer = port.writable.getWriter(); //функция записи в порт
			aa= new MyClass(writer); //параметр - функция отправки сообщения
			const reader = port.readable.getReader();
			while (true) { //слушаем порт
				let { value, done } = await reader.read();
				if (done) {
					reader.releaseLock();
					break;
				}
				aa.listener.call(aa, value)//вызов функции чтения из порта
			}
		})();		
	},
	writer(data){
		pole.innerText=pole.innerText+data+"\r\n";
	}
};



function start(){
	list=document.querySelectorAll('div[data-click]');
	for(let i=0; i<list.length; i++){
		links.click[list[i].dataset.click]=list[i];
	}
	links.click["recovery"].style.opacity=1;
	list=document.querySelectorAll('div[data-line="formats"]');
	for(let i=0; i<list.length; i++){
		links.formats[i]=list[i];
		links.formats[i].style.display="none";
	}
}


let link_window_all=document.querySelector('body');
link_window_all.addEventListener('click', links.call_func);  
link_window_all.addEventListener("change", links.call_func_chng);
dallas.addEventListener('mouseup', control.d_stop );
dallas.addEventListener('mousedown', control.d_start );
dallas.addEventListener('mouseout', control.d_end );
start();