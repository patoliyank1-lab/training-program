import { StoreUser } from '@/app/Types/User';
import { checkLogin } from '../../../utils/auth/authFunction';


export async function POST(request: Request) {
  try {
    const body:{email:string, password:string} = await request.json();

    const user = await checkLogin(body);

    
    if(!user){
        return new Response('Email not found', {
            status:401,
            headers:{ 'Content-Type': 'application/json' }
        })
    }
    if(user){
        const returnData:StoreUser = {
            id:user.id,
            name:user.name, 
            email:user.email, 
            role:user.role, 
            avatar:user.avatar,
        }


        return new Response(JSON.stringify(returnData), {
            status:201,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    return new Response('Error to login user', {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {

    return new Response(JSON.stringify(error), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}