import {NextRequest,NextResponse} from 'next/server';
import {getOffers} from '@/lib/amazon';
export const dynamic='force-dynamic';
export async function GET(req:NextRequest){const ids=(req.nextUrl.searchParams.get('ids')||'').split(',');if(ids.length>20)return NextResponse.json({error:'too_many_ids'},{status:400});const items=await getOffers(ids);return NextResponse.json({items},{headers:{'Cache-Control':'no-store'}})}
