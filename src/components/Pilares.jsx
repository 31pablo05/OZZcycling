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
		more: "Trabajamos con Pinarello, Specialized, Trek y más. Asesoramiento personalizado para cada ciclista.",
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
		more: "Shimano Service Center. Reparaciones, upgrades y mantenimiento con garantía oficial.",
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
			<>
				Indumentaria, cascos, luces, ruedas y componentes premium. Todo para tu bici y tu comodidad.
				<div className="mt-4 flex justify-center">
					<img
						src="/OZZimages/Zapatillas.jpg"
						alt="Zapatillas de ciclismo"
						className="rounded-lg shadow-md w-40 h-32 object-cover border border-blue-200"
					/>
				</div>
			</>
		),
	},
];

const Pilares = () => {
	const [open, setOpen] = useState([false, false, false]);

	const handleToggle = (idx) => {
		setOpen(open.map((v, i) => (i === idx ? !v : false)));
	};

	return (
		<section className="py-16 bg-white text-blue-950">
			<h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-tight animate-fade-in">
				Nuestros Pilares
			</h2>
			<div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
				{pilares.map((pilar, idx) => (
					<div
						key={pilar.title}
						className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl group"
					>
						<div className="mb-4">{pilar.icon}</div>
						<h3 className="font-bold text-xl mb-2 text-blue-900 group-hover:text-blue-700 transition-colors duration-200">
							{pilar.title}
						</h3>
						<p className="text-gray-700 mb-4">{pilar.desc}</p>
						<button
							className="text-blue-700 font-semibold underline underline-offset-4 hover:text-blue-900 transition-colors duration-200 mb-2"
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
			{/* Testimonios/Cifras */}
			<div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-3 gap-8 text-center">
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
			<div className="text-center mt-12">
				<a
					href="/tienda"
					className="inline-block bg-gradient-to-r from-blue-900 to-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg text-lg tracking-wide hover:scale-105 transition-transform duration-200"
				>
					Conocé nuestra tienda
				</a>
			</div>
			<style>{`
        .animate-fade-in {
          animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
		</section>
	);
};

export default Pilares;
