import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; 

import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../../services/auth.service';  
import { By } from '@angular/platform-browser';

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

  it('Deberia retornar invalidado ', () => { 

    const mockCredentials = {
      email:'0x0x0x0x',
      password:'11'
    }

    const emailForm:any = component.formLogin.get('email')
    const passwordForm:any = component.formLogin.get('password')

    emailForm.setValue(mockCredentials.email)
    passwordForm.setValue(mockCredentials.password)

    expect(component.formLogin.invalid).toBeTruthy();
  });

  it('el boton deberia tener la palabra iniciar sesion',()=>{
    const elementRef = fixture.debugElement.query(By.css('.form-action'))
    const getInnerText = elementRef.nativeElement.innerText
    expect(getInnerText).toEqual('Iniciar sesión')
  })
});
