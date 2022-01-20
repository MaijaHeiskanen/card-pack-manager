import { useRef } from 'react';

export default function useDebounce<T>(service: T): T {
    const serviceRef = useRef(service);

    return serviceRef.current;
}
