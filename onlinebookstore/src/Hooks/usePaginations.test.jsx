// import { renderHook, act } from '@testing-library/react'; // Ensure you have the right imports
// import { describe, it, expect } from 'vitest';
// import usePagination from './usePaginations';

// describe('usePagination', () => {
//     it('should initialize with the correct page', () => {
//         const { result } = renderHook(() => usePagination(1, 5));
//         expect(result.current.page).toBe(1); // Initial page should be 1
//     });

//     it('should go to the next page', () => {
//         const { result } = renderHook(() => usePagination(1, 5));

//         act(() => {
//             result.current.fnNextPage(); // Go to the next page
//         });

//         expect(result.current.page).toBe(2); // Page should now be 2
//     });

//     it('should not go beyond the last page', () => {
//         const { result } = renderHook(() => usePagination(5, 5));

//         act(() => {
//             result.current.fnNextPage(); // Try to go to the next page
//         });

//         expect(result.current.page).toBe(5); // Should remain on page 5
//     });

//     it('should go to the previous page', () => {
//         const { result } = renderHook(() => usePagination(3, 5));

//         act(() => {
//             result.current.fnPrevPage(); // Go to the previous page
//         });

//         expect(result.current.page).toBe(2); // Page should now be 2
//     });

//     it('should not go before the first page', () => {
//         const { result } = renderHook(() => usePagination(1, 5));

//         act(() => {
//             result.current.fnPrevPage(); // Try to go to the previous page
//         });

//         expect(result.current.page).toBe(1); // Should remain on page 1
//     });

//     it('should change to a specific page', () => {
//         const { result } = renderHook(() => usePagination(1, 5));

//         act(() => {
//             result.current.fnChangePage(3); // Change to page 3
//         });

//         expect(result.current.page).toBe(3); // Page should now be 3
//     });
// });
