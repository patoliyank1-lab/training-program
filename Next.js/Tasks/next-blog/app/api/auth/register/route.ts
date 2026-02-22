import { User } from '@/app/Types/User';
import { storeUser } from '../../../utils/auth/storeUser';


export async function POST(request: Request) {
  try {
    const body: User = await request.json();

    storeUser(body)

    const {age, gender, password, createdAt, ...otherData} = body

    return new Response(JSON.stringify(otherData), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {

    return new Response(JSON.stringify(error), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}