let abonent={
	key:'',
	session:'',	
	domain:'',
	port:''
};

function Step(params, obj, func, back, msg) {
	this.params = params;
	this.obj = obj;	
	this.func = func;
	this.back = back;
	this.msg = msg;
}
let queue=new Set(); //очередь
let iterator = {};//итератор для очереди
let done=true;

Class main_queue { //задача очереди: создать и добавить генераторы,по очереди перебирать их
	constructor(writer, timer) {
		this.writer = writer;
		this.timer = timer;
		this.comm.writer=this.writer;
		this.comm.next=this.next;
	}
	queue=new Set(); //очередь
	done=true;
	flag=false;
	comm={};
	callback={};
	iterator={};
	buffer={};
	listener(data) {
		
	}
	add(func, data) {
		let step=func(data);
		step.next(this.comm);
		if(this.done){
			this.queue.clear();
			this.queue.add(step);
			this.iterator = this.queue[Symbol.iterator](); //итератор для очереди
			let result=this.iterator.next();
			this.done=result.done;
			this.buffer=result.value;
		}else{
			this.queue.add(step);
		}

	}
	pause(flag) {
		this.flag=flag;
	}
	next() {
		if(!this.flag){
			//this.callback=iterator.next();
			let result=this.iterator.next();
			this.done=result.done;
			this.buffer=result.value;
		}
	}
}

function* generate(obj) { //(data, callback, timer)
	//{data, callbac, timer}
	let comm = yield ;
	comm.writer(obj.data);
	let answer = yield callback;
	callback(answer);
	comm.next();
}

function add_step(step){
	if(!done){
		queue.add(step);
	}else{
		done=false;
		queue.clear();
		iterator = queue[Symbol.iterator]();
		queue.add(step);
		buffer.show();
		first=true;
	}
}

let buffer={
	step:{},
	show(msg1){
		console.log("step");
		if(this.step){
			let msg= new TextDecoder("utf-8").decode(msg1);
			clearTimeout(this.timer);
			let txt="";
			if(this.step.msg){
				txt=this.step.msg+" ";
			}
			if(msg){
				pole.innerText=pole.innerText+txt+msg;
			} else{
				pole.innerText=pole.innerText+txt+"OK\r\n";
			}
			if(this.step.back){
				this.step.back(msg);
			}
			let result= iterator.next();
			done=result.done;
			this.step=result.value;
			if(!done){
				
				if(this.step.func){
					if(this.step.params){
						this.step.obj[this.step.func](this.step.params);
						//abonent.writer.write(this.step.params);
					}else{
						this.step.func();
					}
				}
				this.timer=setTimeout(this.show, 200, "stopped by timeout");
			}
		}else{
			done=true;
		}
	},
	timer:{}

};

let comm={
	ax_get(func, url){//стандартная функция отправки сообщения
		let req=new XMLHttpRequest();
		req.addEventListener('load', control[func]);//привязали контекст
		req.open('GET', url, true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.responseType = 'text';
		req.send();
	},
	ax(form, url){//стандартная функция отправки сообщения
		let req=new XMLHttpRequest();
		req.addEventListener('load', comm.show_ax);//привязали контекст
		//req.upload;
		req.open('POST', url, true);
		//req.setRequestHeader('Content-Type', 'multipart/form-data');//'application/json');
		//req.setRequestHeader('Content-Type', 'application/json');
		
		
		req.responseType = 'text';
		//req.send(form);
		let frm = window.open(req.send(form), "we", "");
		//req.onload=comm.err;
	},

	err(e){
		let data=e.target;
		if(data.status!=200){
			if(data.status>399){
				console.log(data.status);
			}
			if(data.response=="Wrong login or password"||data.response=="Wrong domain, session or session expired"){
				control.on_on(['first_menu', 'manual_munu', 'manual_login']);
			}
		}
	},
    show_ax(e) {//стандартная функция получения сообщения
        let data=e.target;
		let obj;
		let isValidJSON=true;
        if(data.status==200){
			try { obj=JSON.parse(data.response)} catch { isValidJSON = false };
			if(!isValidJSON){
				obj=data.response;
				
			}
			//return obj;
			console.log(data.response);
		}
    },
	


};

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
		//abonent.writer.write(data);
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
		add_step(new Step(data, abonent.writer, "write",'',"Power" ));
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
	recovery(link){
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
		(async () => {
			abonent.port = await navigator.serial.requestPort(); //выбираем порт
			//console.log(abonent.port.getInfo());
			await abonent.port.open(settings); //настройки
			//const reader = abonent.port.readable.getReader();
			for(let i in links.click){
				links.click[i].style.opacity=1;
			}
			abonent.writer = abonent.port.writable.getWriter();
			
			//const textDecoder = new TextDecoderStream();
			//const readableStreamClosed = abonent.port.readable.pipeTo(textDecoder.writable);
			//const reader = textDecoder.readable.getReader();
			const reader = abonent.port.readable.getReader();
			while (true) { //слушаем порт
				let { value, done } = await reader.read();
				if (done) {
					reader.releaseLock();
					break;
				}
				buffer.show(value);
			}
		})();		
	},

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