import { ApiError } from './apiError';
import { resolve } from 'path';
import * as fs from 'fs';

export class Packer {
    static pack(filePath: string): string {
        let output = '';

        //Read file lines as an array of strings
        const lines: Array<string> = this.readData(filePath);
        if (!lines || !lines.length) {
            return output;
        }

        lines.forEach((line: string) => {
            if (!line || !line.length) {
                return output;
            }

            //Format line string
            const { weightLimit, itens } = this.formatData(line);

            //Extract line data
            const { weights,
                values,
                index,
                amount,
                cache } = this.setInitialData(weightLimit, itens);

            //Calculates best value found for the package
            const knapSack = this.knapsack(
                weightLimit,
                weights,
                values,
                index,
                amount,
                cache
            );

            //Backtrack cache 2D array to list each selected item
            const backTrackResult = this.backTrack(amount, weightLimit, knapSack.cache, weights, index, []);
            output += this.formatOutput(knapSack.result, backTrackResult.result);
        });

        return output;
    }

    private static readData(filePath: string): Array<string> {
        if (!filePath || !filePath.length) {
            throw new ApiError();
        }

        try {
            filePath = resolve(filePath);
            const data = fs.readFileSync(filePath, 'utf8');
            const lines = data.split('\n');

            return lines;
        } catch (e) {
            throw new ApiError();
        }
    }

    private static formatOutput(result: number, backTrackResult: Array<number>): string {
        if (!result || result <= 1 || !backTrackResult || !backTrackResult.length) {
            return '\n-';
        }

        return `\n${backTrackResult.reverse().join(', ')}`;
    }

    private static formatData(line: string): { weightLimit: number, itens: Array<string> } {
        try {
            const weightLimit = Number(line.split(':')[0]);
            const itens = line.split(':')[1].replace(/[€()]/g, '').split(' ').filter((i) => i != '');
            if (weightLimit > 100 || weightLimit <= 0) {
                throw new ApiError();
            }

            return {
                weightLimit,
                itens
            };
        } catch (e) {
            throw new ApiError();
        }
    }

    private static setInitialData(weightLimit: number, itens: Array<string>): {
        weights: Array<number>,
        values: Array<number>,
        index: Array<number>,
        amount: number,
        cache: Array<Array<number>>
    } {
        const weights: Array<number> = [];
        const values: Array<number> = [];
        const index: Array<number> = [];
        itens.forEach(item => {
            if (item.split(',')[0]) {
                index.push(Number(item.split(',')[0]));
            }

            if (item.split(',')[1] && Number(item.split(',')[1]) <= 100) {
                weights.push(Number(item.split(',')[1]));
            } else {
                throw new ApiError();
            }

            if (item.split(',')[2] && Number(item.split(',')[2]) <= 100) {
                values.push(Number(item.split(',')[2]));
            } else {
                throw new ApiError();
            }
        });

        if (!index.length || !weights.length || !values.length) {
            throw new ApiError();
        }

        if (index.length > 15) {
            throw new ApiError();
        }

        const amount = index.length;

        //Creates 2D array
        const cache = new Array(amount + 1);
        for (let i = 0; i < cache.length; i++) {
            cache[i] = new Array(weightLimit + 1);
        }

        for (let i = 0; i < amount + 1; i++) {
            for (let j = 0; j < weightLimit + 1; j++) {
                cache[i][j] = -1;
            }
        }

        return {
            weights,
            values,
            index,
            amount,
            cache
        };
    }

    private static knapsack(
        weightLimit: number,
        weights: Array<number>,
        values: Array<number>,
        index: Array<number>,
        amount: number,
        cache: Array<Array<number>>
    ): { result: number; cache: Array<Array<number>> } {

        //Skip because this value has already been calculated
        if (cache[amount][Math.round(weightLimit)] != -1) {
            return {
                result: cache[amount][Math.round(weightLimit)],
                cache: cache
            };
        }

        if (amount == 0 || weightLimit == 0) {
            return { result: 0, cache: cache };
        }

        //Skip if the item would not fit the limit
        if (weights[amount - 1] > weightLimit) {
            return {
                result: cache[amount][Number(weightLimit)] = this.knapsack(
                    weightLimit,
                    weights,
                    values,
                    index,
                    amount - 1,
                    cache
                ).result,
                cache: cache
            };
        }

        const firstValue =
            values[amount - 1] +
            this.knapsack(
                weightLimit - weights[amount - 1],
                weights,
                values,
                index,
                amount - 1,
                cache
            ).result;

        const secondValue = this.knapsack(
            weightLimit,
            weights,
            values,
            index,
            amount - 1,
            cache
        ).result;

        //Check what value is higher and saves it on cache
        return {
            result: cache[amount][Math.round(weightLimit)] =
                firstValue > secondValue ? firstValue : secondValue,
            cache: cache
        };
    }

    private static backTrack(amount: number, weightLimit: number, cache: Array<Array<number>>, weights: Array<number>, index: Array<number>, result: Array<number>): { data: number, result: Array<number> } {
        if (amount === 0 || weightLimit === 0) {
            return {
                data: 0,
                result: []
            };
        }

        if (cache[amount][Math.round(weightLimit)] > cache[amount - 1][Math.round(weightLimit)] && weightLimit - weights[amount - 1] >= 0) {
            result.push(index[amount - 1]);
            return { data: this.backTrack(amount - 1, weightLimit - weights[amount - 1], cache, weights, index, result).data, result };
        } else {
            return { data: this.backTrack(amount - 1, weightLimit, cache, weights, index, result).data, result };
        }
    }
}
