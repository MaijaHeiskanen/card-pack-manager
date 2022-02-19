import classNames from 'classnames';

import { Chart } from 'primereact/chart';
import { useTranslation } from 'react-i18next';

interface CardsPieChartProps {
    blackCardsCount: number;
    whiteCardsCount: number;
    className?: string;
}

export const CardsPieChart = (props: CardsPieChartProps) => {
    const { t } = useTranslation();
    const { className, blackCardsCount, whiteCardsCount } = props;

    const chartData = {
        labels: [t('amountOfWhiteCards'), t('amountOfBlackCards')],
        datasets: [
            {
                data: [whiteCardsCount, blackCardsCount],
                backgroundColor: ['#ffffff', '#37404c'],
                // hoverBackgroundColor: ['#dee2e6', '#495057'],
            },
        ],
    };
    return (
        <Chart
            className={classNames(className)}
            type="pie"
            data={chartData}
            options={{
                elements: {
                    arc: {
                        borderColor: '#37404c',
                    },
                },
            }}
            width="200px"
            height="200px"
        />
    );
};
