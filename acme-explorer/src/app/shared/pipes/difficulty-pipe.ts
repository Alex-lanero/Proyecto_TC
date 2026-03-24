import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'difficulty',
  standalone: true
})
export class DifficultyPipe implements PipeTransform {

  transform(value: string): { label: string, color: string, icon: string } {
    switch(value) {
      case 'easy':
        return { label: 'Easy', color: '#00c853', icon: '🟢' };

      case 'medium':
        return { label: 'Medium', color: '#ff9800', icon: '🟠' };

      case 'hard':
        return { label: 'Hard', color: '#f44336', icon: '🔴' };

      default:
        return { label: value, color: '#999', icon: '⚪' };
    }
  }

}