import {
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() collapse: boolean = false;
  @Output() toggleCollapse = new EventEmitter<boolean>();
  @ViewChild('op', { static: false }) overlayPanel!: OverlayPanel;

  private authService = inject(AuthService);

  private renderer = inject(Renderer2);

  public fullName = this.authService.getFullNameCurrentUser();

  items: MenuItem[] | undefined;
  style = {
    'margin-bottom': '0.5rem',
  };
  emitEvent() {
    this.toggleCollapse.emit(!this.collapse);
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Mi cuenta',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Ver perfil',
            icon: 'pi pi-fw pi-id-card',
          },
        ],
      },
      {
        label: 'Configuración',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Editar Perfil',
            icon: 'pi pi-fw pi-pencil',
          },
          {
            label: 'Cambiar contraseña',
            icon: 'pi pi-fw pi-exclamation-triangle',
          },
        ],
      },
      {
        label: 'Salir',
        icon: 'pi pi-fw pi-power-off',
        command: () => this.logout(),
      },
    ];
    this.renderer.listen('window', 'scroll', () => {
      this.overlayPanel.hide();
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
