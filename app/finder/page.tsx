import type {Metadata} from 'next';import Finder from '@/components/Finder';
export const metadata:Metadata={title:'Matratzen-Finder',description:'Beantworte vier Fragen und vergleiche nachvollziehbare Matratzen-Treffer.'};
export default function Page(){return <Finder/>}
