import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 

import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../../services/auth.service';  

describe('AuthPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule], 
      declarations: [LoginPageComponent],
      providers: [AuthService] 
    });
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { 
    expect(component).toBeTruthy();
  });
});
