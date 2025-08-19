
import React from 'react';
import { QrCodeIcon } from './icons/QrCodeIcon';

interface PartnerQrCodeProps {
    partnerId: string;
}

const PartnerQrCode: React.FC<PartnerQrCodeProps> = ({ partnerId }) => {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`CLUBE_ZN_VALIDATE_PARTNER_${partnerId}`)}`;

    return (
         <section aria-labelledby="qrcode-heading" className="bg-surface p-8 rounded-2xl border border-border text-center max-w-md mx-auto">
            <QrCodeIcon className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 id="qrcode-heading" className="text-3xl font-bold text-text-primary mb-2">Validação de Desconto</h1>
            <p className="text-md text-text-secondary mb-6">
                Peça para o cliente escanear este QR Code com o aplicativo do Clube ZN para validar o desconto.
            </p>
            <div className="p-4 bg-white inline-block rounded-xl border border-border shadow-sm">
                <img src={qrCodeUrl} alt="QR Code para validação de desconto" width="300" height="300" />
            </div>
        </section>
    );
};

export default PartnerQrCode;
