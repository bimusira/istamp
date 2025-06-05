import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('generateuuid')
  newCustomer() {
    const uuid = this.customerService.generate();
    return { uuid };
  }
}
 
