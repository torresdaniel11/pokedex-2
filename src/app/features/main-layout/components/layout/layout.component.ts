import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  signOut() {
    this.auth
      .signOut()
      .then((ok) => {
        this.router.navigate(['auth']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
