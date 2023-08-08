import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router'; 
import { AdminRoleGuard } from './admin-role.guard';

describe('AdminRoleGuard', () => { 
  let guard: AdminRoleGuard; 

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminRoleGuard); 
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
