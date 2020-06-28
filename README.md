# Lucky

The purpose of this repository is to create a program that can produce 
lotto number predictions from historical data of the Australian Powerball.
Please note that the output of this program does NOT guarantee winning results.
I don't believe that lotto numbers can be predicted through historical events since
all draws are independent from each other. This software examines the theories and
concepts presented online and puts them into practice. USE AT YOUR OWN RISK.


## Algorithm

I found that there are three most common theories when decided your next lotto ticket number;

1. Based on historical events, choose numbers that have not been picked in the past
2. Based on historical events, choose numbers that were successfully picked in the past
3. Based on historical events, choose numbers based on patterns that were successful in the past

In this software, I chose to combine both 2 and 3 due to how much it makes sense to me.

### Step 1: Generate combinations
For this step, I first analysed the probability of the numbers appearing at a given position through a histogram.
The histogram is then used to generate an array of WEIGHTED combinations. The weight of the combination is determined
by the success rate of the value in the position.

For example, imagine that we have data for 10 draws for a lotto that requires users to pick 3 numbers.
The histogram data would look something like this:

Position 1 numbers -> probability:
```
1: 3 / 10
3: 4 / 10
5: 3 / 10
```
Position 2 numbers -> probability:
```
1: 3 / 10
2: 5 / 10
15: 2 / 10
```
Position 3 numbers -> probability:
```
6: 5 / 10
3: 4 / 10
7: 1 / 10
```
From this histogram, we generate combinations that look something like this:
```
combination: 1, 2, 6
weight: (3/10) * (5/10) * (5/10) 
```

### Step 2: Re-eveluate weighting through pattern analysis
Another way that people pick lotto numbers is based on the historical patterns. 
They simplify the chance of winning by examining the chances of an odd or even number being chosen
in the draw.

In the Australian Powerball, the people can choose numbers between 1 - 45. What I found
is that the chances of an even number being chosen is around 49%, whilst the chances of an odd
number being chosen is 51%.

With this in mind, I created an algorithm which goes through all the historical data and created
a histogram for every odd-even combination. (e.g. 0 odd, 7 even). One thing I found interesting is 
that choosing 3 even numbers and 4 odds have at least 30% chance of being successful based on historical events.

I used the pattern histogram to re-eveluate the weight of the combinations produced from Theory 2.

### Step 3: Print top 10 results
After re-eveluating the combinations, I sorted them from the combination with the highest chance of
winning to the lowest chance of winning and printed out the top 10 results.

