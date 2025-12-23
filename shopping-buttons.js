// ===============================================
// Shopping and Reset Buttons - TypeBlitz
// Handlers for store navigation and data reset
// ===============================================

console.log('Shopping buttons script loaded');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing shopping buttons');

    // Shop on Daraz button
    const shopDarazBtn = document.getElementById('shopDarazBtn');
    if (shopDarazBtn) {
        console.log('Daraz button found');
        shopDarazBtn.addEventListener('click', function () {
            console.log('Daraz button clicked');
            if (typeof playSound === 'function') playSound('click');
            window.open('https://www.daraz.pk/', '_blank');
        });
    } else {
        console.error('Daraz button NOT found!');
    }

    // Shop on ShopY button
    const shopShopYBtn = document.getElementById('shopShopYBtn');
    if (shopShopYBtn) {
        console.log('ShopY button found');
        shopShopYBtn.addEventListener('click', function () {
            console.log('ShopY button clicked');
            if (typeof playSound === 'function') playSound('click');
            window.open('https://www.shopy.pk/', '_blank');
        });
    } else {
        console.error('ShopY button NOT found!');
    }

    // Reset All Data button
    const resetAllDataBtn = document.getElementById('resetAllDataBtn');
    if (resetAllDataBtn) {
        console.log('Reset button found');
        resetAllDataBtn.addEventListener('click', function () {
            console.log('Reset button clicked');
            const confirmed = confirm(
                '⚠️ WARNING: This will permanently delete ALL your data including:\n\n' +
                '• All earned coins\n' +
                '• Practice history\n' +
                '• Statistics and achievements\n' +
                '• Redemption records\n\n' +
                'This action CANNOT be undone!\n\n' +
                'Are you absolutely sure you want to continue?'
            );

            if (confirmed) {
                const doubleConfirm = confirm(
                    'Last chance! Click OK to permanently erase all data, or Cancel to keep your progress.'
                );

                if (doubleConfirm) {
                    // Clear all localStorage data
                    localStorage.clear();

                    // Show confirmation
                    alert('✅ All data has been reset successfully!\n\nThe page will now reload with a fresh start.');
                    if (typeof playSound === 'function') playSound('complete');

                    // Reload page to reset everything
                    setTimeout(function () {
                        location.reload();
                    }, 500);
                }
            }
        });
    } else {
        console.error('Reset button NOT found!');
    }

    console.log('Shopping buttons initialization complete');
});
