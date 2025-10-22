export class Constants {

  public static system_name = 'Opportunity Saas';


  //BASE URL

  public static baseUrl = 'https://opportunity-back-end-heroku-24-f5f4c9a40b23.herokuapp.com';
  //public static baseUrl = 'http://localhost:8080';


  //messages
  public static errorTittle = 'Ocorreu um erro';
  public static errorMessage = 'Tente novamente mais tarde';

  public static timeZone = 3;
  public static hoursToStart = 3 + Constants.timeZone;

  //PRICING
  public static multiplyCorp = 10;
  public static multiplyPro = 5;

  //MERCADO PAGO PROD
  public static public_key = 'APP_USR-63b1d06a-b9bb-4f81-bfe1-f44465f24a63';

  //SANDBOX
  //Configure a public key de produção do seu usuário de teste comprador no frontend da sua aplicação e o access token de produção do seu usuário de teste vendedor no seu backend.
  //COMPRADOR {"id":1132580773,"nickname":"TESTY13GLUS1","password":"qatest8433","site_status":"active","email":"test_user_89870946@testuser.com"}MacBook-Pro-de-Paulo:OpportunityApi Paulo$

  //ESSE TOKEN FUNCIONA LOCALMENTE PAGAMENTO
  //public static public_key = 'TEST-1a14e509-e403-413e-87d5-f88271020e1d';


  //SUBSCRIBE PROD TIMESHEET ATE 20 USUARIOS
  //public static preapproval_plan_id = '2c9380848117bc5501811df17b0502d0';

  //SUBSCRIBE TESTE PROD 1 REAL
  //public static preapproval_plan_id = '2c93808480fe342801811df336480d74';

  //ASSINATURA MENSAL OPPORTUNITY
  public static preapproval_plan_id = '2c938084851aa2d9018527cecaef0599'

  //SUBSCRIBE TEST
  //public static preapproval_plan_id = '2c93808480fe342801811ba10c340c37';

  //PAYMENT
  public static payment_approved = 'Pagamento aprovado!';
  public static enjoy = 'Aproveite nossa ferramenta';

  public static payment_rejected = 'Pagamento rejeitado';
  public static check_card  = 'Verifique os dados do cartão e tente novamente';


}
