"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";

const slides = [
	{
		id: 1,
		type: "image",
		src: "/OZZimages/f7.jpg",
		title: "Bicicletas Premium",
		subtitle: "Pinarello • Factor • Trek • Cervélo • Cannondale",
		description:
			"Accedé a las marcas más prestigiosas del ciclismo mundial. Asesoramiento personalizado y excelencia en cada detalle.",
		cta: "Explorar Bicicletas",
		action: "bicicletas",
	},
	{
		id: 2,
		type: "image",
		src: "/OZZimages/dogma.jpg",
		title: "Shimano Service Center",
		subtitle: "Mecánica Certificada • Repuestos Originales",
		description:
			"Servicio técnico oficial con estándares internacionales. Tu bicicleta en manos de especialistas de confianza.",
		cta: "Solicitar Servicio",
		action: "servicio",
	},
	{
		id: 3,
		type: "image",
		src: "/OZZimages/local.jpg",
		title: "Experiencia OZZcycling",
		subtitle: "Un Espacio Exclusivo para Ciclistas",
		description:
			"Descubrí un lugar diseñado para ciclistas exigentes. Viví la pasión, la innovación y la comunidad OZZ.",
		cta: "Conocer OZZ",
		action: "nosotros",
	},
	{
		id: 4,
		type: "image",
		src: "/OZZimages/pinarello.jpg",
		title: "Accesorios & Indumentaria",
		subtitle: "Equipamiento de Alto Rendimiento",
		description:
			"Indumentaria técnica, cascos de élite, zapatillas y accesorios premium para alcanzar tu mejor performance.",
		cta: "Ver Colección",
		action: "accesorios",
	},
];

export default function HeroSection({ onCategoryFilter }) {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 6000);
		return () => clearInterval(interval);
	}, []);

	const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
	const prevSlide = () =>
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	const goToSlide = (index) => setCurrentSlide(index);

	const handleCTAClick = () => {
		const currentAction = slides[currentSlide].action;
		// Puedes personalizar la navegación según tu app
		if (onCategoryFilter) onCategoryFilter(currentAction);
		// O usar scrollToSection si tienes IDs en la página
		// scrollToSection(currentAction);
	};

	return (
		<section
			className=" relative w-full h-screen min-h-screen flex items-center overflow-hidden"
			style={{ zIndex: 1, marginTop: 0, paddingTop: 0 }}
		>
			{/* Carrusel de Imágenes de Fondo */}
			<div className="absolute inset-0">
				{slides.map((slide, index) => (
					<div
						key={slide.id}
						className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
							index === currentSlide
								? "opacity-100 scale-100"
								: "opacity-0 scale-110 pointer-events-none"
						}`}
					>
						<img
							src={slide.src}
							alt={slide.title}
							className="mt-24 w-full h-full object-cover object-center"
						/>
						{/* Overlay para legibilidad */}
						<div className="absolute inset-0 bg-gradient-to-r from-[#004391]/50 via-[#002a5c]/30 to-[#004391]/40"></div>
						<div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-black/20"></div>
					</div>
				))}
			</div>

			{/* Animación de fondo moderna */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
				<div className="absolute top-20 left-10 w-32 h-32 bg-[#379299]/30 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-900/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
				<div className="absolute bottom-1/3 left-1/2 w-36 h-36 bg-[#379299]/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
			</div>

			{/* Contenido Principal */}
			<div className="mt-24 relative z-20 w-full h-full flex items-center">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
					<div className="flex items-center justify-center h-full min-h-screen pt-16 lg:pt-20">
						<div className="space-y-4 sm:space-y-6 text-center lg:text-left max-w-4xl mx-auto lg:mx-0 w-full">
							{/* Título Principal */}
							<div className="space-y-2 sm:space-y-3">
								<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
									<span
										className="text-white drop-shadow-2xl block animate-fadeInUp"
										style={{
											textShadow:
												"0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)",
										}}
									>
										OZZcycling
									</span>
									<span
										className="text-transparent bg-clip-text bg-gradient-to-r from-[#379299] to-[#004391] drop-shadow-2xl block animate-fadeInUp delay-200"
										style={{
											filter: "drop-shadow(0 0 10px rgba(0,0,0,0.8))",
										}}
									>
										Pasión por el Ciclismo
									</span>
								</h1>
								<h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-300 to-blue-600 font-bold animate-fadeInUp delay-300 drop-shadow-2xl">
									{slides[currentSlide].subtitle}
								</h2>
							</div>
							{/* Descripción */}
							<p
								className="text-sm sm:text-base md:text-lg text-white leading-relaxed max-w-lg sm:max-w-2xl mx-auto lg:mx-0 animate-fadeInUp delay-400 px-4 sm:px-0 drop-shadow-2xl font-medium"
								style={{
									textShadow: "0 0 15px rgba(0,0,0,0.8)",
								}}
							>
								{slides[currentSlide].description}
							</p>
							{/* Botón de Acción */}
							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fadeInUp delay-500 px-4 sm:px-0">
								<button
									onClick={handleCTAClick}
									className="group text-white px-6 py-3 sm:px-8 sm:py-3 rounded-2xl font-bold text-base sm:text-lg shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-1 duration-300 flex items-center justify-center space-x-2"
									style={{
										background:
											"linear-gradient(90deg, #379299 0%, #004391 100%)",
										boxShadow: "0 10px 30px rgba(55, 146, 153, 0.25)",
									}}
								>
									<span>{slides[currentSlide].cta}</span>
									<ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
								</button>
							</div>
							{/* Indicadores de Estadísticas - ELIMINADOS */}
						</div>
					</div>
				</div>
			</div>
			{/* Controles del Carrusel */}
			<div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
				<div className="flex items-center space-x-3 sm:space-x-6 backdrop-blur-xl rounded-full px-4 py-3 sm:px-6 sm:py-4 border shadow-2xl bg-[#004391]/80 border-[#379299]/30">
					<button
						onClick={prevSlide}
						className="p-1.5 sm:p-2 rounded-full bg-white/20 border border-white/30 transition-all duration-300 hover:scale-110"
					>
						<ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-lg" />
					</button>
					<div className="flex space-x-2 sm:space-x-3">
						{slides.map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
									index === currentSlide
										? "scale-125 shadow-lg"
										: "bg-white/40 hover:bg-white/60"
								}`}
								style={
									index === currentSlide
										? { background: "linear-gradient(45deg, #379299, #004391)" }
										: {}
								}
							/>
						))}
					</div>
					<button
						onClick={nextSlide}
						className="p-1.5 sm:p-2 rounded-full bg-white/20 border border-white/30 transition-all duration-300 hover:scale-110"
					>
						<ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-lg" />
					</button>
				</div>
			</div>
			{/* Indicador de Progreso */}
			<div
				className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1"
				style={{ backgroundColor: "rgba(0,67,145,0.4)" }}
			>
				<div
					className="h-full transition-all duration-300 ease-linear shadow-lg"
					style={{
						width: `${((currentSlide + 1) / slides.length) * 100}%`,
						background: "linear-gradient(90deg, #379299 0%, #004391 100%)",
					}}
				/>
			</div>
			<style>{`
        .animate-fadeInUp {
          animation: fadeInUp 1s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fadeInUp.delay-200 {
          animation-delay: .2s;
        }
        .animate-fadeInUp.delay-300 {
          animation-delay: .3s;
        }
        .animate-fadeInUp.delay-400 {
          animation-delay: .4s;
        }
        .animate-fadeInUp.delay-500 {
          animation-delay: .5s;
        }
        .animate-fadeInUp.delay-600 {
          animation-delay: .6s;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-pulse {
          animation: pulseSlow 6s ease-in-out infinite alternate;
        }
        .animate-pulse.delay-1000 {
          animation-delay: 1s;
        }
        .animate-pulse.delay-500 {
          animation-delay: .5s;
        }
        .animate-pulse.delay-2000 {
          animation-delay: 2s;
        }
        @keyframes pulseSlow {
          0% { transform: scale(1);}
          100% { transform: scale(1.15);}
        }
      `}</style>
		</section>
	);
}
