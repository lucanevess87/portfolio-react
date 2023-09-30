const applyMask = (value: string | number, mask: string): string => {
  if (!value) return '';
  let formattedValue = '';
  const unmaskedValue = String(value).replace(/\D+/g, '');
  let position = 0;

  for (let i = 0; i < mask.length; i++) {
    if ((mask[i] === '#' || mask[i] === '*') && unmaskedValue[position] !== undefined) {
      formattedValue += unmaskedValue[position++];
    } else if (unmaskedValue[position] !== undefined) {
      formattedValue += mask[i];
    }
  }

  return formattedValue;
};

const financialMask = (value: string, divider = 100): string => {
  const newValue = value.replace(/\D+/g, '');

  const valueWithoutMask = String(newValue)
    .replaceAll('$', '')
    .replaceAll('.', '')
    .replaceAll(',', '')
    .trim();

  return (Number(valueWithoutMask) / divider).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const Mask = {
  formatPhone: (value: string): string => {
    return applyMask(value, '(**) *****-****');
  },
  formatCurrency: (value: string, divider = 100): string => financialMask(value, divider),
  parsePercent: (value: string): string => {
    const mask = `${String(value).replace(/\D+/g, '')}${value.length === 0 ? '' : '%'}`;
    return mask;
  },
};
