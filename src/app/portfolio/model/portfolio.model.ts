export interface PortfolioContainer {
    portfolio: Portfolio[];
}

export interface Portfolio {
    variables: { [ticker: string]: number };
}


