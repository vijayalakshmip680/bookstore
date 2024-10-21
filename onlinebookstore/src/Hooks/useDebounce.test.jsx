// // import { renderHook, act } from '@testing-library/react-hooks';
// import { renderHook,act } from '@testing-library/react';
// import { describe, it, vi } from 'vitest';
// import useDebounce from './useDebounce';

// describe('useDebounce', () => {

//     beforeEach(() => {
//         vi.useFakeTimers(); // Set up fake timers before each test
//     });

//     afterEach(() => {
//         vi.clearAllTimers(); // Clear timers after each test
//         vi.useRealTimers(); // Restore real timers
//     });

//     it('should return the initial value immediately', () => {
//         const { result } = renderHook(() => useDebounce('test', 300));
//         expect(result.current).toBe('test');
//     });
// });
