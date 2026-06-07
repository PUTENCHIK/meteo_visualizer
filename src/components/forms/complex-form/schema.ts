import type { ScaleInterval } from '@utils/common';
import { z } from 'zod';

const NAME: ScaleInterval = { min: 6, max: 255 };
const SECRETKEY: ScaleInterval = { min: 6, max: 255 };

export const complexSchema = z.object({
    name: z
        .string()
        .min(NAME.min, `Минимальная длина - ${NAME.min}`)
        .max(NAME.max, `Максимальная длина - ${NAME.max}`),
    secretkey: z
        .union([
            z.literal(''),
            z.null(),
            z
                .string()
                .min(SECRETKEY.min, `Минимальная длина - ${SECRETKEY.min}`)
                .max(SECRETKEY.max, `Максимальная длина - ${SECRETKEY.max}`),
        ])
        .transform((val) => (val === '' ? null : val)),
    is_private: z.boolean(),
    latitude: z.number('Введите число').min(-90, 'Широта [-90, 90]').max(90, 'Широта [-90, 90]'),
    longitude: z
        .number('Введите число')
        .min(-180, 'Долгота [-180, 180]')
        .max(180, 'Долгота [-180, 180]'),
    address: z
        .string()
        .nullable()
        .transform((val) => (val === '' ? null : val)),
});

export type ComplexFormData = z.infer<typeof complexSchema>;
