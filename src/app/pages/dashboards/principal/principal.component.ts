import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  urlMetabase: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {
    if (window.location.hostname === 'app.labsrad.com.br') {
      this.urlMetabase = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://app.labsrad.com.br:3000/public/dashboard/b078ded4-9052-4091-952c-1f9d3cb4fefc`,
      );
    } else if (window.location.hostname === 'app-hml.connectvarejo.com.br') {
      this.urlMetabase = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://app-hml.labsrad.com.br:3000/public/dashboard/b078ded4-9052-4091-952c-1f9d3cb4fefc`,
      );
    } else {
      this.urlMetabase = this.sanitizer.bypassSecurityTrustResourceUrl(
        `http://localhost:3000/public/dashboard/3098c639-07f1-434d-878b-228615e51deb`,
      );
    }
  }

  ngOnInit() {}
}
