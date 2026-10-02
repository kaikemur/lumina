export function getLuxStatus(lux) {
    if (lux < 100) {
        return { status: 'Muito Baixo', color: '#EF4444', bgColor: '#FEE2E2', level: 'low' };
    } else if (lux < 300) {
        return { status: 'Baixo', color: '#F59E0B', bgColor: '#FEF3C7', level: 'low' };
    } else if (lux <= 500) {
        return { status: 'Ideal', color: '#10B981', bgColor: '#ECFDF5', level: 'ideal' };
    } else if (lux <= 1000) {
        return { status: 'Alto', color: '#F59E0B', bgColor: '#FEF3C7', level: 'high' };
    } else {
        return { status: 'Muito Alto', color: '#EF4444', bgColor: '#FEE2E2', level: 'high' };
    }
}

export function getLuxPercentage(lux) {
    const maxLux = 2000;
    return Math.min((lux / maxLux) * 100, 100);
}

export function getRecommendation(lux) {
    if (lux < 100) {
        return 'Aumente a iluminação. Ambiente muito escuro para trabalho.';
    } else if (lux < 300) {
        return 'Considere adicionar mais iluminação para conforto visual.';
    } else if (lux <= 500) {
        return 'Iluminação ideal para trabalho e produtividade.';
    } else if (lux <= 1000) {
        return 'Iluminação adequada, mas monitore para evitar fadiga.';
    } else {
        return 'Reduza a iluminação para evitar desconforto visual.';
    }
}

export function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export function formatTime(date) {
    const d = new Date(date);
    return d.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatDateTime(date) {
    const d = new Date(date);
    return d.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
