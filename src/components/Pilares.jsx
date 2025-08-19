import React, { useState } from "react";

const pilares = [
	{
		icon: (
			<svg width="48" height="48" fill="none" viewBox="0 0 48 48">
				<circle
					cx="24"
					cy="24"
					r="22"
					stroke="#2563eb"
					strokeWidth="4"
					fill="#e0f2fe"
				/>
				<path
					d="M12 36l8-16 8 16"
					stroke="#2563eb"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<circle cx="24" cy="36" r="3" fill="#2563eb" />
			</svg>
		),
		title: "Bicicletas de Alta Gama",
		desc: "Selección curada de las mejores marcas y modelos para cada disciplina.",
		more: (
			<div>
				Trabajamos con Pinarello, Specialized, Trek y más. Asesoramiento personalizado para cada ciclista.
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
					<img src="/OZZimages/Pinarello2.jpg" alt="Pinarello" className="rounded-lg shadow w-full h-24 object-cover" />
					<img src="/OZZimages/local.jpg" alt="Local OZZ" className="rounded-lg shadow w-full h-24 object-cover" />
					<img src="/OZZimages/f7.jpg" alt="F7" className="rounded-lg shadow w-full h-24 object-cover" />
					<img src="/OZZimages/dogma.jpg" alt="Dogma" className="rounded-lg shadow w-full h-24 object-cover" />
					<img src="/OZZimages/bicigw3.jpg" alt="Bici GW" className="rounded-lg shadow w-full h-24 object-cover" />
					<img src="/OZZimages/1.jpg" alt="Bici 1" className="rounded-lg shadow w-full h-24 object-cover" />
					<video src="/OZZvideos/pasioncicli.mp4" controls className="rounded-lg shadow w-full h-24 object-cover" />
				</div>
			</div>
		),
	},
	{
		icon: (
			<svg width="48" height="48" fill="none" viewBox="0 0 48 48">
				<rect
					x="8"
					y="8"
					width="32"
					height="32"
					rx="8"
					fill="#e0f2fe"
					stroke="#2563eb"
					strokeWidth="4"
				/>
				<path
					d="M24 16v16M16 24h16"
					stroke="#2563eb"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</svg>
		),
		title: "Servicio Técnico Experto",
		desc: "Mecánicos certificados para el cuidado y mantenimiento de tu inversión.",
		more: (
			<div>
				Shimano Service Center. Reparaciones, upgrades y mantenimiento con garantía oficial.
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
					<video src="/OZZvideos/trabajando2.mp4" controls className="rounded-lg shadow w-full h-24 object-cover" />
					<video src="/OZZvideos/trabajando1.mp4" controls className="rounded-lg shadow w-full h-24 object-cover" />
					<video src="/OZZvideos/cuidamosbici.mp4" controls className="rounded-lg shadow w-full h-24 object-cover" />
					<img src="/OZZimages/service.jpg" alt="Service" className="rounded-lg shadow w-full h-24 object-cover" />
				</div>
			</div>
		),
	},
	{
		icon: (
			<svg width="48" height="48" fill="none" viewBox="0 0 48 48">
				<rect
					x="10"
					y="10"
					width="28"
					height="28"
					rx="8"
					fill="#e0f2fe"
					stroke="#2563eb"
					strokeWidth="4"
				/>
				<path
					d="M24 18v12M18 24h12"
					stroke="#2563eb"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</svg>
		),
		title: "Accesorios y Componentes",
		desc: "Todo lo necesario para optimizar tu rendimiento y seguridad.",
		more: (
			<div>
				Indumentaria, cascos, luces, ruedas y componentes premium. Todo para tu bici y tu comodidad.
				<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
					<video src="/OZZvideos/zapatillasshimano.mp4" controls className="rounded-lg shadow w-full h-24 object-cover" />
					<video src="/OZZvideos/Grupo electrónico de 12V ⚡️ Dura-Ace permite realizar cambios instantáneos, precisos y ultra ráp.mp4" controls className="rounded-lg shadow w-full h-24 object-cover" />
					<video src="/OZZvideos/¡Vení a buscar tu Grupo Shimano 105 Di2! 📍Av. Libertador 2984.Somos el lugar que ciclista quier.mp4" controls className="rounded-lg shadow w-full h-24 object-cover" />
				</div>
				<div className="mt-4 flex justify-center">
					<img
						src="/OZZimages/Zapatillas.jpg"
						alt="Zapatillas de ciclismo"
						className="rounded-lg shadow-md w-40 h-32 object-cover border border-blue-200"
					/>
				</div>
			</div>
		),
	},
];

const Pilares = () => {
	const [open, setOpen] = useState([false, false, false]);

	const handleToggle = (idx) => {
		setOpen(open.map((v, i) => (i === idx ? !v : false)));
	};

	return (
		<section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
			{/* Elementos decorativos de fondo */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
				<div className="absolute top-10 left-10 w-32 h-32 bg-[#379299]/10 rounded-full animate-pulse"></div>
				<div className="absolute top-40 right-20 w-20 h-20 bg-[#379299]/15 rounded-full animate-bounce delay-700"></div>
				<div className="absolute bottom-20 left-1/4 w-16 h-16 bg-[#379299]/20 rounded-full animate-pulse delay-1000"></div>
				<div className="absolute bottom-32 right-1/3 w-24 h-24 bg-[#379299]/8 rounded-full animate-bounce delay-500"></div>
				<div className="absolute top-20 right-1/4 w-8 h-8 bg-gradient-to-br from-[#379299] to-[#2d7a7a] transform rotate-45 animate-spin opacity-20" style={{animationDuration: '8s'}}></div>
				<div className="absolute bottom-40 left-1/3 w-6 h-6 bg-gradient-to-br from-[#379299] to-[#2d7a7a] transform rotate-12 animate-ping opacity-30"></div>
				{/* Partículas flotantes adicionales */}
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-[#379299]/40 rounded-full animate-pulse"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 3}s`,
							animationDuration: `${2 + Math.random() * 2}s`
						}}
					/>
				))}
			</div>

			<div className="relative z-10 container mx-auto px-6 text-center">
				<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 relative animate-fade-in">
					Nuestros <span className="text-[#379299] relative z-10">Pilares</span>
					<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-3 bg-gradient-to-r from-[#379299]/30 to-[#379299]/10 scale-x-0 animate-pulse" style={{animationDelay: '1s', animationDuration: '2s', animationFillMode: 'forwards'}}></div>
				</h2>
				<p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 font-light animate-fade-in delay-200">
					Bicicletería de alta gama en Buenos Aires. Servicio técnico certificado, asesoramiento profesional y los mejores accesorios para tu bici.
				</p>
				{/* Tarjetas de pilares */}
				<div className="flex flex-wrap justify-center gap-6 mb-8 animate-fade-in delay-400">
					{pilares.map((pilar, idx) => (
						<div
							key={pilar.title}
							className="group bg-white px-8 py-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer border border-blue-100 hover:border-[#379299]/30 max-w-xs flex-1 flex flex-col items-center"
						>
							<div className="mb-4">{pilar.icon}</div>
							<h3 className="font-bold text-xl mb-2 text-blue-900 group-hover:text-[#379299] transition-colors duration-200">
								{pilar.title}
							</h3>
							<p className="text-gray-700 mb-4">{pilar.desc}</p>
							<button
								className="text-[#379299] font-semibold underline underline-offset-4 hover:text-blue-900 transition-colors duration-200 mb-2"
								onClick={() => handleToggle(idx)}
							>
								{open[idx] ? "Ver menos" : "Ver más"}
							</button>
							{open[idx] && (
								<div className="bg-blue-50 rounded-lg p-4 text-blue-900 text-sm shadow-inner animate-fade-in">
									{pilar.more}
								</div>
							)}
						</div>
					))}
				</div>
				{/* Cifras y testimonios */}
				<div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-3 gap-8 text-center animate-fade-in delay-600">
					<div>
						<div className="text-3xl font-bold text-blue-900 mb-2">+10 años</div>
						<div className="text-gray-600">de experiencia</div>
					</div>
					<div>
						<div className="text-3xl font-bold text-blue-900 mb-2">+2000</div>
						<div className="text-gray-600">bicicletas vendidas</div>
					</div>
					<div>
						<div className="text-3xl font-bold text-blue-900 mb-2">100%</div>
						<div className="text-gray-600">clientes satisfechos</div>
					</div>
				</div>
				{/* Botón de acción */}
				<div className="text-center mt-12 animate-fade-in delay-800">
					<a
						href="/tienda"
						className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#379299] to-[#2d7a7a] text-white font-bold py-4 px-8 rounded-full hover:from-[#2d7a7a] hover:to-[#1f5a5a] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl overflow-hidden"
					>
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
						<span className="relative z-10">Conocé nuestra tienda</span>
						<svg
							className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
						</svg>
					</a>
				</div>
			</div>
			<style>{`
        .animate-fade-in {
          animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fade-in.delay-200 {
          animation-delay: .2s;
        }
        .animate-fade-in.delay-400 {
          animation-delay: .4s;
        }
        .animate-fade-in.delay-600 {
          animation-delay: .6s;
        }
        .animate-fade-in.delay-800 {
          animation-delay: .8s;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-pulse {
          animation: pulseSlow 6s ease-in-out infinite alternate;
        }
        .animate-bounce {
          animation: bounceTag 1.2s infinite alternate;
        }
        .animate-spin {
          animation: spinTag 8s linear infinite;
        }
        .animate-ping {
          animation: pingTag 2s cubic-bezier(0,0,.2,1) infinite;
        }
        @keyframes pulseSlow {
          0% { transform: scale(1);}
          100% { transform: scale(1.15);}
        }
        @keyframes bounceTag {
          from { transform: translateY(0);}
          to { transform: translateY(-8px);}
        }
        @keyframes spinTag {
          100% { transform: rotate(360deg);}
        }
        @keyframes pingTag {
          75%, 100% { transform: scale(2); opacity: 0;}
        }
      `}</style>
		</section>
	);
};

export default Pilares;
