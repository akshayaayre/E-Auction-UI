import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DxButtonModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let httpClient: HttpClient;
  // let http: HttpClientTestingModule;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
      imports:[HttpClientTestingModule, DxButtonModule, FormsModule, ReactiveFormsModule]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
