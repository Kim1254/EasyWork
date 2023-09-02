import torch

from transformers import (
    AutoConfig,
    AutoModelForQuestionAnswering,
    AutoTokenizer
)

# Note: You should download the model of BERT-MRC and paste it into model folder
model_name = "./bert_korquad"

# Read Model
config = AutoConfig.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=True)
model = AutoModelForQuestionAnswering.from_pretrained(model_name,config=config)

# Activate
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)
_ = model.eval()

def QuestionAnswering(context, question):
    encodings = tokenizer(context, question, max_length=512, truncation=True,
                        padding="max_length", return_token_type_ids=False)
    encodings = {key: torch.tensor([val]) for key, val in encodings.items()}

    input_ids = encodings["input_ids"]
    attention_mask = encodings["attention_mask"]

    input_ids = input_ids.to(device)
    attention_mask = attention_mask.to(device)

    pred = model(input_ids, attention_mask=attention_mask)

    start_logits, end_logits = pred.start_logits, pred.end_logits

    token_start_index, token_end_index = start_logits.argmax(dim=-1), end_logits.argmax(dim=-1)

    pred_ids = input_ids[0][token_start_index: token_end_index + 1]

    prediction = tokenizer.decode(pred_ids)
    return prediction
