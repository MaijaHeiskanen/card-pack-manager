import { useRef } from 'react';

export default function useService<T>(service: T): T {
    const serviceRef = useRef(service);

    return serviceRef.current;
}
