distance(X1, Y1, X2, Y2, D) :- 
    D is sqrt((X1 - X2) ** 2 + (Y1 - Y2) ** 2).

team_nearby(Team, X, Y, Tolerance, Time) :- 
    location(Team, Time, XPos, YPos), distance(X,Y, XPos, YPos, D), '@<'(D, Tolerance).

nearby(X1, Y1, X2, Y2, Tolerance) :- 
    distance(X1, Y1, X2, Y2, D), '@<'(D, Tolerance). 

defended(Team1, Team2, T) :- 
    location(Team1, T, X2, Y2), 
    location(Team2, T, X1, Y1), 
    X1 \= X2,
    Y1 \= Y2,
    Team2 \= Team1,
    nearby(X1, Y1, X2, Y2, 2).

