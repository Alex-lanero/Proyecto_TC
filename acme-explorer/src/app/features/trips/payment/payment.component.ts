import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../../core/services/application.service';
import { NotificationService } from '../../../core/services/notification.service';
import { IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, NgxPayPalModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  amount = signal(0);
  applicationId = signal('');

  // 🔥 estados UI
  isLoading = signal(false);
  isPaying = signal(false);
  paymentSuccess = signal(false);
  paymentError = signal(false);

  // 🔥 SSR fix
  private platformId = inject(PLATFORM_ID);
  isBrowser = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {

    this.isBrowser = isPlatformBrowser(this.platformId);

    this.amount.set(Number(this.route.snapshot.paramMap.get('amount')));
    this.applicationId.set(this.route.snapshot.paramMap.get('id') || '');

    if (this.isBrowser) {
      this.initConfig();
    }
  }

  private initConfig(): void {

    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',

      createOrderOnClient: () => ({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: this.amount().toString(),
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.amount().toString()
              }
            }
          },
          items: [
            {
              name: 'Trip payment',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: this.amount().toString()
              }
            }
          ]
        }]
      }),

      // 🔥 CLICK (bloquea doble pago)
      onClick: () => {
        if (this.isPaying()) return;

        this.isPaying.set(true);
        this.isLoading.set(true);
      },

      // 🔥 SUCCESS
      onApprove: (data, actions) => {
        actions.order.capture().then(() => {

          this.applicationService.pay(this.applicationId());

          this.isLoading.set(false);
          this.paymentSuccess.set(true);
          this.isPaying.set(false);

          this.notification.show('Payment successful', 'success');

          setTimeout(() => {
            this.router.navigate(['/explorer/applications']);
          }, 2000);
        });
      },

      // 🔥 ERROR
      onError: () => {
        this.isLoading.set(false);
        this.paymentError.set(true);
        this.isPaying.set(false);

        this.notification.show('Payment failed', 'error');
      },

      // 🔥 CANCEL (CLAVE)
      onCancel: () => {
        this.isLoading.set(false);
        this.isPaying.set(false);

        this.notification.show('Payment cancelled', 'info');
      }
    };
  }
}