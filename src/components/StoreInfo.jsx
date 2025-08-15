import React from "react";
import { FaStar, FaGoogle } from "react-icons/fa";

const reviews = [
	{
		name: "Manuel Costa",
		badge: "Local Guide · 122 opiniones · 65 fotos",
		text: "Excelente servicio, y una mención para David (quién me atendió). Primero llevé la bicicleta de mi pareja que necesitaba un shifter nuevo (pudieron hacerlo en el día). Luego llevé mi bicicleta que había estado de viaje y algo golpeada y mal ...",
		date: "Hace 2 años",
		rating: 5,
	},
	{
		name: "Sophie Martin",
		badge: "Local Guide · 73 opiniones · 178 fotos",
		text: "La mejor onda y servicio, buena energía. Para mi la mejor de la zona. Mucha variedad de productos, me cambiaron una cámara al instante.",
		date: "Hace 2 años",
		rating: 5,
	},
	{
		name: "Sofi Calvo",
		badge: "Local Guide · 52 opiniones · 58 fotos",
		text: "Matías muy atento y amable para atender. Aunque tenia un presupuesto bajo, me dió atención y me dedicó tiempo. No terminé comprando pero parece un lugar muy profesional.",
		date: "Hace 10 meses",
		rating: 5,
	},
	{
		name: "Agustin Griffi",
		badge: "Local Guide · 20 opiniones",
		text: "Excelente atención. Servicio super personalizado. Tienen elementos de primera calidad.",
		date: "Hace un año",
		rating: 5,
	},
];

const StoreInfo = () => (
	<section
		className="py-16 text-blue-50 relative overflow-hidden"
		style={{
			background: "linear-gradient(135deg, #004391 0%, #002a5c 100%)",
		}}
	>
		{/* Animación de fondo con círculos y blur */}
		<div className="absolute inset-0 pointer-events-none z-0">
			<div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-blue-900 opacity-30 rounded-full blur-2xl animate-pulse-slow"></div>
			<div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-[#379299] opacity-20 rounded-full blur-3xl animate-pulse-slow2"></div>
			<div className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-400 opacity-10 rounded-full blur-2xl animate-pulse-slow3"></div>
		</div>
		<h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg relative z-10">
			OZZcycling Store
		</h2>
		<div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8 mb-10 relative z-10">
			{/* Info texto */}
			<div className="flex-1 text-center md:text-left">
				<p className="mb-2 font-semibold text-blue-100">
					Visita Nuestra Tienda en Buenos Aires
				</p>
				<p className="mb-2 text-blue-100">
					Av. del Libertador 2984, Buenos Aires, Argentina
				</p>
				<p className="mb-2 text-blue-100">Tel: 011 3778-8374</p>
				<p className="mb-2 text-blue-100">Email: Omar.azzem1@gmail.com</p>
				<button
					className="mt-4 px-6 py-2 bg-blue-900 text-white rounded font-semibold shadow hover:bg-blue-800 transition"
					onClick={() =>
						window.open(
							"https://www.google.com/maps?q=Av.+del+Libertador+2984,+Buenos+Aires,+Argentina",
							"_blank"
						)
					}
				>
					Ver Mapa
				</button>
			</div>
			{/* Mapa de ubicación a la derecha y más chico */}
			<div className="w-full md:w-80 rounded-2xl overflow-hidden shadow-lg border border-blue-900">
				<iframe
					title="Ubicación OZZcycling"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.635664179248!2d-58.411!3d-34.574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5b6c7f8e1e1%3A0x2e7e2c2e2c2e2c2e!2sAv.%20del%20Libertador%202984%2C%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses!2sar!4v1690000000000!5m2!1ses!2sar"
					width="100%"
					height="220"
					style={{ border: 0 }}
					allowFullScreen=""
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					className="w-full h-56"
				></iframe>
			</div>
		</div>
		{/* Opiniones y reseñas */}
		<div className="max-w-5xl mx-auto mb-10 relative z-10">
			<h3 className="text-2xl font-bold text-blue-100 mb-6 text-center flex items-center justify-center gap-2">
				<FaGoogle className="text-[#4285F4] text-3xl" />
				Opiniones de nuestros clientes
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{reviews.map((review, idx) => (
					<div
						key={idx}
						className="bg-white/90 rounded-2xl shadow-xl border border-blue-100 p-6 flex flex-col gap-3 hover:shadow-2xl transition-all duration-300 animate-fade-in"
						style={{ animationDelay: `${idx * 0.15}s` }}
					>
						<div className="flex items-center gap-3 mb-2">
							<span className="font-bold text-[#004391]">{review.name}</span>
							<span className="text-xs text-blue-700">{review.badge}</span>
							<span className="flex items-center ml-auto">
								{[...Array(review.rating)].map((_, i) => (
									<FaStar key={i} className="text-yellow-400 mr-0.5" />
								))}
							</span>
						</div>
						<p className="text-[#004391] text-base mb-2">{review.text}</p>
						<span className="text-xs text-blue-500">{review.date}</span>
					</div>
				))}
			</div>
			<div className="text-center mt-8">
				<a
					href="https://share.google/lLE1R5jYwoYKwYGMq"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block px-8 py-3 bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
				>
					Ver más opiniones en Google
				</a>
			</div>
		</div>
		<style>{`
      .animate-fade-in {
        animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both;
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px);}
        to { opacity: 1; transform: translateY(0);}
      }
      .animate-pulse-slow {
        animation: pulseSlow 6s ease-in-out infinite alternate;
      }
      .animate-pulse-slow2 {
        animation: pulseSlow2 8s ease-in-out infinite alternate;
      }
      .animate-pulse-slow3 {
        animation: pulseSlow3 7s ease-in-out infinite alternate;
      }
      @keyframes pulseSlow {
        0% { transform: scale(1);}
        100% { transform: scale(1.15);}
      }
      @keyframes pulseSlow2 {
        0% { transform: scale(1);}
        100% { transform: scale(1.1);}
      }
      @keyframes pulseSlow3 {
        0% { transform: scale(1);}
        100% { transform: scale(1.2);}
      }
    `}</style>
	</section>
);

export default StoreInfo;
