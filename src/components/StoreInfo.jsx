import React, { useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
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

const StoreInfo = () => {
	const [activeReview, setActiveReview] = useState(0);
	const totalReviews = reviews.length;

	const nextReview = () => setActiveReview((activeReview + 1) % totalReviews);
	const prevReview = () => setActiveReview((activeReview - 1 + totalReviews) % totalReviews);

	return (
		<section
			className="py-16 text-blue-50 relative overflow-hidden"
			style={{
				background: "linear-gradient(135deg, #0a1e3a 0%, #004391 60%, #6b21a8 100%)",
			}}
		>
			{/* Fondo decorativo moderno con gradiente y partículas */}
			<div className="absolute inset-0 pointer-events-none z-0">
				<div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-blue-900 opacity-30 rounded-full blur-2xl animate-pulse-slow"></div>
				<div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-cyan-600 opacity-20 rounded-full blur-3xl animate-pulse-slow2"></div>
				<div className="absolute top-1/2 left-1/2 w-40 h-40 bg-violet-500 opacity-10 rounded-full blur-2xl animate-pulse-slow3"></div>
				{/* Partículas flotantes */}
				{[...Array(8)].map((_, i) => (
					<div
						key={i}
						className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 3}s`,
							animationDuration: `${2 + Math.random() * 2}s`
						}}
					/>
				))}
			</div>
			<h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg relative z-10 flex items-center justify-center gap-3">
				<svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M12 8v4l3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
				OZZcycling Store
			</h2>
		<div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-8 mb-10 relative z-10">
			{/* Info texto */}
					<div className="flex-1 text-center md:text-left">
						<p className="mb-2 font-semibold text-blue-100 flex items-center gap-2">
							<svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
							Visita Nuestra Tienda en Buenos Aires
						</p>
						<p className="mb-2 text-blue-100 flex items-center gap-2">
							<svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
							Av. del Libertador 2984, Buenos Aires, Argentina
						</p>
						<p className="mb-2 text-blue-100 flex items-center gap-2">
							<svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
							Tel: 011 3778-8374
						</p>
						<p className="mb-2 text-blue-100 flex items-center gap-2">
							<svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 12v1a4 4 0 01-8 0v-1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 16v2m0-6V6m0 0V4m0 2h2m-2 0H8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
							Email: Omar.azzem1@gmail.com
						</p>
						<button
							className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-600 text-white rounded font-semibold shadow hover:scale-105 transition flex items-center gap-2 animate-pulse"
							aria-label="Ver Mapa de OZZcycling"
							onClick={() =>
								window.open(
									"https://www.google.com/maps?q=Av.+del+Libertador+2984,+Buenos+Aires,+Argentina",
									"_blank"
								)
							}
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
							Ver Mapa
						</button>
					</div>
			{/* Mapa de ubicación a la derecha y más chico */}
			<div className="w-full md:w-80 rounded-2xl overflow-hidden shadow-lg border-2 border-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 hover:scale-105 transition">
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
			{/* Opiniones y reseñas con slider/carousel y badge Google Reviews */}
			<div className="max-w-5xl mx-auto mb-10 relative z-10">
				<div className="flex items-center justify-center gap-3 mb-6">
								<span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 text-white font-bold rounded-full shadow-lg animate-pulse">
									<FaGoogle className="text-white text-2xl" />
									Google Reviews
								</span>
					<h3 className="text-2xl font-bold text-blue-100 text-center">Opiniones de nuestros clientes</h3>
				</div>
				<div className="flex items-center justify-center gap-4 mb-6">
					<button
						className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:scale-110 transition"
						aria-label="Reseña anterior"
						onClick={prevReview}
					>
						<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
					</button>
								<RevealOnScroll animationDelay={0}>
									<div
										className="bg-white/90 rounded-2xl shadow-xl border border-blue-100 p-6 flex flex-col gap-3 hover:shadow-2xl transition-all duration-300 w-full max-w-xl"
										tabIndex={0}
										aria-label={`Reseña de ${reviews[activeReview].name}`}
									>
										<div className="flex items-center gap-3 mb-2">
											<span className="font-bold text-[#004391]">{reviews[activeReview].name}</span>
											<span className="text-xs text-blue-700">{reviews[activeReview].badge}</span>
											<span className="flex items-center ml-auto">
												{[...Array(reviews[activeReview].rating)].map((_, i) => (
													<FaStar key={i} className="text-yellow-400 mr-0.5 animate-pulse" />
												))}
											</span>
										</div>
										<p className="text-[#004391] text-base mb-2">{reviews[activeReview].text}</p>
										<span className="text-xs text-blue-500">{reviews[activeReview].date}</span>
									</div>
								</RevealOnScroll>
					<button
						className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg hover:scale-110 transition"
						aria-label="Reseña siguiente"
						onClick={nextReview}
					>
						<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
					</button>
				</div>
				<div className="text-center mt-8">
					<a
						href="https://share.google/lLE1R5jYwoYKwYGMq"
						target="_blank"
						rel="noopener noreferrer"
						  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300 animate-pulse"
						aria-label="Ver más opiniones en Google"
					>
						<FaGoogle className="text-white text-xl" />
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
);}

export default StoreInfo;
