import React from 'react';

const Header = ({ sentence }) => {
    return (
        <h1 className="text-2xl font-bold mb-4 text-center">
            Суйломдун деталдары
            <p className={`text-lg mb-2 font-semibold text-start ${sentence.is_corrected ? 'text-green-900' : 'text-red-900'}`}>
                <strong>Текст: #{sentence.id}</strong> {sentence.text}
            </p>
        </h1>
    );
};

export default Header;
