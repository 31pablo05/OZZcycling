"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";

const slides = [
	{
	id: 1,
	type: "image",
	src: "/OZZimages/bicis/bici1.webp",
	title: "Bicicletas Premium",
	subtitle: "Pinarello • Factor • Trek • Cervélo • Cannondale",
	},
	{
	id: 2,
	type: "image",
	src: "/OZZimages/bicis/dogma.jpg",
	title: "Shimano Service Center",
	subtitle: "Mecánica Certificada • Repuestos Originales",
	},
	{
	id: 3,
	type: "image",
	src: "/OZZimages/localav.lib/local.jpg",
	title: "Experiencia OZZcycling",
	subtitle: "Un Espacio Exclusivo para Ciclistas",
	},
	{
	id: 5,
	type: "image",
	src: "/OZZimages/bicis/pinarello.jpg",
	title: "Accesorios & Indumentaria",
	subtitle: "Equipamiento de Alto Rendimiento",
	},
	{
	id: 6,
	type: "image",
	src: "/OZZimages/localav.lib/local1.jpg",
	title: "Accesorios & Indumentaria",
	subtitle: "Equipamiento de Alto Rendimiento",
	},
];

export default function HeroSection() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
	const heroRef = useRef(null);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 3000);
		return () => clearInterval(interval);
	}, [currentSlide]);

	useEffect(() => {
		setIsVisible(true);
	}, []);

       const handleMouseMove = (e) => {
	       // Desactivar parallax en mobile
	       if (window.innerWidth < 768) return;
	       if (heroRef.current) {
		       const rect = heroRef.current.getBoundingClientRect();
		       const x = ((e.clientX - rect.left) / rect.width) * 100;
		       const y = ((e.clientY - rect.top) / rect.height) * 100;
		       setMousePosition({ x, y });
	       }
       };

	const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
	const prevSlide = () =>
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	const goToSlide = (index) => setCurrentSlide(index);



	return (
		<section
			ref={heroRef}
			onMouseMove={handleMouseMove}
			className="relative w-full h-screen min-h-screen flex items-center overflow-hidden"
			style={{ zIndex: 1, marginTop: 0, paddingTop: 0 }}
		>
			{/* Carrusel de Imágenes y Videos de Fondo */}
			<div className="mt-24 absolute inset-0">
				{slides.map((slide, index) => (
					<div
						key={slide.id}
						className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
							index === currentSlide
								? "opacity-100 scale-100"
								: "opacity-0 scale-100 pointer-events-none"
						}`}
					>
						<div className="relative w-full h-full">
															{/* Fondo difuminado igual para todas las imágenes */}
															<div className="mt-8 absolute inset-0 overflow-hidden">
																<img
																	src={slide.src}
																	alt=""
																	className="w-full h-full object-cover scale-110 blur-[2px] opacity-80"
																	style={{ filter: 'brightness(0.95) contrast(1.08)' }}
																/>
															</div>
							
							{/* Gradientes mejorados */}
							<div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
							
							{/* Contenido principal centrado */}
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="relative w-full max-w-4xl mx-auto px-4">
									<div className="relative w-full max-w-2xl mx-auto">
										{/* Para mobile */}
										<div className="block md:hidden">
											<div className="relative w-full aspect-square max-h-[50vh] mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-black/20">
												<img
													src={slide.src}
													alt={slide.title}
													className="w-full h-full object-cover"
												/>
											</div>
										</div>
										{/* Para desktop */}
										<div className="hidden md:block">
											<div className="relative w-full aspect-[4/3] max-h-[60vh] mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-black/20">
												<img
													src={slide.src}
													alt={slide.title}
													className="w-full h-full object-cover"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Elementos de fondo animados mejorados */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
				{/* Partículas pequeñas */}
				<div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
				<div className="absolute top-40 right-20 w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-40"></div>
				<div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse opacity-50"></div>
				<div className="absolute top-60 left-1/3 w-1 h-1 bg-blue-200 rounded-full animate-ping delay-1000 opacity-30"></div>
				<div className="absolute bottom-20 right-1/3 w-2 h-2 bg-cyan-300 rounded-full animate-pulse delay-500 opacity-40"></div>

				{/* Círculos grandes difuminados */}
				<div className="absolute top-20 left-10 w-32 h-32 bg-[#379299]/20 rounded-full blur-2xl animate-pulse"></div>
				<div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-900/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
				<div className="absolute bottom-1/3 left-1/2 w-36 h-36 bg-[#379299]/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
			</div>

			{/* Gradiente dinámico que sigue el mouse */}
			<div 
				className="absolute inset-0 opacity-10 transition-all duration-300 ease-out pointer-events-none z-10"
				style={{
					background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(56, 189, 248, 0.4), transparent 50%)`
				}}
			></div>

			{/* TÍTULO PRINCIPAL MEJORADO */}
			<div className="absolute top-0 left-0 right-0 z-20 pt-20 sm:pt-24 md:pt-16 lg:pt-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center space-y-3 sm:space-y-4">
						<div className="mt-24 space-y-6">
							<div className="relative">
								{/* Efecto de brillo de fondo */}
								<div className="absolute inset-0 blur-3xl opacity-20">
									<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black">
										<span className="block text-cyan-400">OZZcycling</span>
										<span className="block text-blue-400">Pasión por el Ciclismo</span>
									</h1>
								</div>
								{/* Título principal con efectos mejorados */}
								<h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight mt-0 md:mt-16 lg:mt-24">
									<span
										className={`block text-white transition-all duration-1000 transform ${
											isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
										}`}
										style={{
											textShadow: "0 0 30px rgba(56, 189, 248, 0.5), 0 0 60px rgba(56, 189, 248, 0.3), 0 4px 20px rgba(0,0,0,0.8)",
											filter: "drop-shadow(0 0 20px rgba(56, 189, 248, 0.4))"
										}}
									>
										OZZ<span className="text-cyan-400 animate-pulse">cycling</span>
									</span>
									<span
										className={`block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 transition-all duration-1000 delay-300 transform ${
											isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
										}`}
										style={{
											backgroundSize: '200% 200%',
											animation: 'gradientShift 4s ease-in-out infinite',
											filter: "drop-shadow(0 0 15px rgba(56, 189, 248, 0.6))"
										}}
									>
										Pasión por el Ciclismo
									</span>
								</h1>
							</div>
							{/* Línea decorativa animada */}
							<div className={`flex justify-center transition-all duration-1000 delay-500 ${
								isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
							}`}>
								<div className="relative">
									<div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"></div>
									<div className="absolute inset-0 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full blur-sm opacity-75"></div>
									<div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Información del slide actual - Posicionada abajo */}
			<div className="absolute bottom-20 sm:bottom-24 left-0 right-0 z-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					   <div className="backdrop-blur-xl bg-black/30 rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl">
						   <h2 className="text-lg sm:text-xl md:text-2xl text-white font-bold mb-2 drop-shadow-lg">
							   {slides[currentSlide].title}
						   </h2>
						   <p className="text-sm sm:text-base text-blue-100 mb-4 drop-shadow-lg">
							   {slides[currentSlide].subtitle}
						   </p>
					</div>
				</div>
			</div>

			{/* Controles del Carrusel */}
			<div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
				<div className="flex items-center space-x-3 sm:space-x-6 backdrop-blur-xl rounded-full px-4 py-3 sm:px-6 sm:py-4 border shadow-2xl bg-[#004391]/80 border-[#379299]/30">
					<button
						onClick={prevSlide}
						className="p-1.5 sm:p-2 rounded-full bg-white/20 border border-white/30 transition-all duration-300 hover:scale-110 hover:bg-white/30"
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
						className="p-1.5 sm:p-2 rounded-full bg-white/20 border border-white/30 transition-all duration-300 hover:scale-110 hover:bg-white/30"
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

		</section>
	);
}