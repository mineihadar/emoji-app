import datetime
import pandas as pd
import emoji_data_python
import csv
import os
import json

def add_to_counter(emoji_list, counter):
    for emoji in emoji_list:
        counter[emoji] = counter.get(emoji, 0) + 1

def contains_emoji(text, counter):
    emoji_list = emoji_data_python.get_emoji_regex().findall(text)
    if not emoji_list:
        return False
    add_to_counter(emoji_list, counter)
    return True

def get_weeks(start_date, end_date):
    hebrew_dates = {
        "01": "ינואר",
        "02": "פברואר",
        "03": "מרץ",
        "04": "אפריל",
        "05": "מאי",
        "06": "יוני",
        "07": "יולי",
        "08": "אוגוסט",
        "09": "ספטמבר",
        "10": "אוקטובר",
        "11": "נובמבר",
        "12": "דצמבר"
    }

    weeks = []
    current_date = datetime.datetime.strptime(start_date, "%Y-%m-%d")
    end_date = datetime.datetime.strptime(end_date, "%Y-%m-%d")

    while current_date <= end_date:
        week = {}
        first_day = current_date
        current_date += datetime.timedelta(days=6)
        last_day = current_date

        if last_day > end_date:
            last_day = end_date

        week['firstDay'] = first_day.strftime("%Y-%m-%d")
        week['lastDay'] = last_day.strftime("%Y-%m-%d")

        first_day_text = f"{first_day.day} {hebrew_dates[first_day.strftime('%m')]}"
        last_day_text = f"{last_day.day} {hebrew_dates[last_day.strftime('%m')]}"
        week['text'] = f"{first_day_text} - {last_day_text}"
        week['emojis'] = {}
        weeks.append(week)
        current_date += datetime.timedelta(days=1)

    return weeks

# Initialize tweet_and_date
tweet_and_date = []

# Initialize weeks
start_date = "2023-01-01"
end_date = "2024-04-06"
weeks = get_weeks(start_date, end_date)

# Loop through all CSV files in the current directory
for filename in os.listdir('.'):
    if filename.endswith(".csv"):
        path = os.path.join('.', filename)
        
        # Read the CSV file into a DataFrame
        df = pd.read_csv(path)

        # Check if the expected columns exist
        if 'full_text' not in df.columns or 'created_at' not in df.columns:
            print(f"Skipping file {filename} due to missing columns.")
            continue
        
        temp_df = df[['full_text', 'created_at']]

        for week in weeks:
            week_emoji_counter = week['emojis']
            week_start = datetime.datetime.strptime(week['firstDay'], "%Y-%m-%d")
            week_end = datetime.datetime.strptime(week['lastDay'], "%Y-%m-%d")

            for tweet_text, tweet_date in temp_df.itertuples(index=False):
                try:
                    tweet_date_obj = datetime.datetime.strptime(tweet_date.split(',')[0], "%m/%d/%Y")
                except ValueError:
                    continue
                if week_start <= tweet_date_obj <= week_end:
                    cur_tweet_emojis = {}
                    if contains_emoji(tweet_text, cur_tweet_emojis):
                        tweet_and_date.append({'tweet': tweet_text, 'date': tweet_date, "emojis": cur_tweet_emojis})
                        add_to_counter(cur_tweet_emojis.keys(), week_emoji_counter)

            # Filter out emojis with fewer than 4 uses
            week['emojis'] = {emoji: count for emoji, count in week_emoji_counter.items() if count >= 4}
            # Sort emojis by frequency
            week['emojis'] = dict(sorted(week['emojis'].items(), key=lambda item: item[1], reverse=True))

# Write weeks and their emojis to a CSV file
with open('weeks_with_emojis.csv', 'w', encoding='utf-8', newline='') as csvfile:
    csvwriter = csv.writer(csvfile)
    # Write the header
    csvwriter.writerow([f"Week {len(weeks) - i}" for i in range(len(weeks))])
    # Find the maximum number of emojis in any week to handle uneven column lengths
    max_emojis = max(len(week['emojis']) for week in weeks)
    # Write the emoji data row by row
    for i in range(max_emojis):
        row = []
        for week in reversed(weeks):  # Reverse the weeks for right-to-left order
            emojis = list(week['emojis'].keys())
            if i < len(emojis):
                row.append(emojis[i])  # Only the emoji without the count
            else:
                row.append('')
        csvwriter.writerow(row)

print("CSV file 'weeks_with_emojis.csv' created successfully.")

# Write the emoji counts to a JSON file for easy lookup
emoji_counts = {week['text']: week['emojis'] for week in weeks}

with open('emoji_counts.json', 'w', encoding='utf-8') as jsonfile:
    json.dump(emoji_counts, jsonfile, ensure_ascii=False, indent=4)

print("JSON file 'emoji_counts.json' created successfully.")
