import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false 
})
export class TranslatePipe implements PipeTransform {
  static currentLang = 'es';

  private translations: Record<string, Record<string, string>> = {
    es: {
      easy: 'Fácil',
      medium: 'Media',
      hard: 'Difícil',
      all: 'Todos',
      'Available Trips': 'Viajes disponibles',
      'Cancel trip': 'Cancelar viaje',
      'Create Trip': 'Crear viaje',
      'Home': 'Inicio',
      'Trips': 'Viajes',
      'Profile': 'Perfil',
      'Logout': 'Cerrar sesión',
      'Login': 'Iniciar sesión',
      'Register': 'Registrarse',
      'Email': 'Correo electrónico',
      'Password': 'Contraseña',
      'Confirm Password': 'Confirmar contraseña',
      'Submit': 'Enviar',
      'Already have an account?': '¿Ya tienes una cuenta?',
      'Don\'t have an account?': '¿No tienes una cuenta?',
      '🌍 Welcome to Acme Explorer': '🌍 Bienvenido a Acme Explorer',
      'Discover amazing trips around the world': 'Descubre viajes increíbles alrededor del mundo',
      'Start exploring': 'Comienza a explorar',
      '✈️ Unique experiences': '✈️ Experiencias únicas',
      'Travel to exclusive destinations around the globe': 'Viaja a destinos exclusivos alrededor del mundo',
      '💰 Best prices': '💰 Mejores precios',
      'Find trips that match your budget': 'Encuentra viajes que se ajusten a tu presupuesto',
      '🧭 Guided tours': '🧭 Tours guiados',
      'Enjoy safe adventures with expert guides': 'Disfruta de aventuras seguras con guías expertos',
      'Ticket': 'Boleto',
      'Location': 'Ubicación',
      'Dificulty': 'Dificultad',
      'Max participants': 'Máximo de participantes',
      'Country': 'País',
      'Full description': 'Descripción completa',
      'This trip has been cancelled': 'Este viaje ha sido cancelado'
    },
    en: {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      all: 'All',
      'Available Trips': 'Available Trips',
      'Cancel trip': 'Cancel trip',
      'Create Trip': 'Create Trip',
      'Home': 'Home',
      'Trips': 'Trips',
      'Profile': 'Profile',
      'Logout': 'Logout',
      'Login': 'Login',
      'Register': 'Register',
      'Email': 'Email',
      'Password': 'Password',
      'Confirm Password': 'Confirm Password',
      'Submit': 'Submit',
      'Already have an account?': 'Already have an account?',
      'Don\'t have an account?': 'Don\'t have an account?',
      '🌍 Welcome to Acme Explorer': '🌍 Welcome to Acme Explorer',
      'Discover amazing trips around the world': 'Discover amazing trips around the world',
      'Start exploring': 'Start exploring',
      '✈️ Unique experiences': '✈️ Unique experiences',
      'Travel to exclusive destinations around the globe': 'Travel to exclusive destinations around the globe',
      '💰 Best prices': '💰 Best prices',
      'Find trips that match your budget': 'Find trips that match your budget',
      '🧭 Guided tours': '🧭 Guided tours',
      'Enjoy safe adventures with expert guides': 'Enjoy safe adventures with expert guides',
      'Ticket': 'Ticket',
      'Location': 'Location',
      'Dificulty': 'Difficulty',
      'Max participants': 'Max participants',
      'Country': 'Country',
      'Full description': 'Full description',
      'This trip has been cancelled': 'This trip has been cancelled'
    }
  };

  transform(value: string): string {
    return this.translations[TranslatePipe.currentLang]?.[value] || value;
  }
}